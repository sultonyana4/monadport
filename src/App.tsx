import { useState, useEffect } from 'react';
import { useBlockNumber, usePublicClient } from 'wagmi';
import './App.css';

// Tipe 'any' tetap kita gunakan untuk menghindari error impor
type BlockWithTransactions = any;

// Komponen Altimeter (ketinggian)
function Altimeter({ blockNumber }: { blockNumber: bigint | undefined }) {
  const altitude = blockNumber ? Number(blockNumber) : 0;
  
  return (
    <div className="instrument altimeter">
      <div className="instrument-label">ALTITUDE</div>
      <div className="instrument-value">{altitude.toLocaleString()}</div>
      <div className="instrument-unit">BLOCKS</div>
    </div>
  );
}

// Komponen Speed Indicator (kecepatan)
function SpeedIndicator({ transactionCount, realTPS }: { transactionCount: number; realTPS: number }) {
  return (
    <div className="instrument speedometer">
      <div className="instrument-label">TXN SPEED</div>
      <div className="instrument-value">{realTPS}</div>
      <div className="instrument-unit">TPS</div>
      <div className="instrument-secondary">
        <small>AVG: {transactionCount}/block</small>
      </div>
    </div>
  );
}

// Komponen Network Status (status jaringan)
function NetworkStatus({ recentBlocks }: { recentBlocks: BlockWithTransactions[] }) {
  const [status, setStatus] = useState<'ONLINE' | 'DELAYED' | 'OFFLINE'>('ONLINE');
  
  useEffect(() => {
    if (recentBlocks.length === 0) {
      setStatus('OFFLINE');
    } else if (recentBlocks.length < 3) {
      setStatus('DELAYED');
    } else {
      setStatus('ONLINE');
    }
  }, [recentBlocks]);
  
  const getStatusColor = () => {
    switch (status) {
      case 'ONLINE': return '#00ff64';
      case 'DELAYED': return '#ffaa00';
      case 'OFFLINE': return '#ff0044';
    }
  };
  
  return (
    <div className="instrument network-status">
      <div className="instrument-label">NETWORK</div>
      <div className="instrument-value" style={{ color: getStatusColor() }}>
        {status}
      </div>
      <div className="instrument-unit">STATUS</div>
      <div className="instrument-secondary">
        <small>{recentBlocks.length}/5 blocks</small>
      </div>
    </div>
  );
}
function HeadingCompass() {
  const [heading, setHeading] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setHeading(prev => (prev + 1) % 360);
    }, 100);
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="instrument compass">
      <div className="instrument-label">HEADING</div>
      <div className="compass-circle">
        <div className="compass-needle" style={{ transform: `rotate(${heading}deg)` }}>
          ✈️
        </div>
      </div>
      <div className="instrument-value">{heading.toString().padStart(3, '0')}°</div>
    </div>
  );
}

// Komponen untuk menampilkan detail satu transaksi
function TransactionRow({ tx, index }: { tx: any; index: number }) {
  const truncateHash = (hash: string) => `${hash.slice(0, 6)}...${hash.slice(-4)}`;

  return (
    <div className="transaction-row">
      <span className="tx-index">#{index + 1}</span>
      <span className="tx-hash">{truncateHash(tx.hash)}</span>
      <span className="tx-from">{truncateHash(tx.from)}</span>
      <span className="tx-to">{truncateHash(tx.to)}</span>
    </div>
  );
}

type Transaction = {
  hash: string;
  from: string;
  to: string;
};

// Daftar airline logos untuk pesawat
const airlineLogos = [
  '✈️', // Airplane emoji
  '🛩️', // Small airplane
  '🚁', // Helicopter  
  '🛫', // Takeoff airplane
  '🛬', // Landing airplane
];

function App() {
  const [recentBlocks, setRecentBlocks] = useState<BlockWithTransactions[]>([]);
  const [selectedBlock, setSelectedBlock] = useState<BlockWithTransactions | null>(null);
  const [averageTxnCount, setAverageTxnCount] = useState<number>(0);
  const [realTPS, setRealTPS] = useState<number>(0);
  
  const publicClient = usePublicClient();
  const { data: blockNumber } = useBlockNumber({ watch: true });

  useEffect(() => {
    if (!blockNumber || !publicClient) return;

    const fetchBlocks = async () => {
      try {
        const blockPromises: Promise<any>[] = [];
        for (let i = 0; i < 5; i++) {
          const num = blockNumber - BigInt(i);
          if (num > 0) {
            blockPromises.push(
              publicClient.getBlock({ 
                blockNumber: num, 
                includeTransactions: true 
              })
            );
          }
        }
        
        const newBlocks = await Promise.all(blockPromises);
        setRecentBlocks(newBlocks);
        
        // Calculate average transaction count from recent blocks
        const totalTxns = newBlocks.reduce((sum, block) => sum + block.transactions.length, 0);
        const avgTxns = newBlocks.length > 0 ? Math.round(totalTxns / newBlocks.length) : 0;
        setAverageTxnCount(avgTxns);
        
        // Calculate real TPS based on block timestamps
        if (newBlocks.length >= 2) {
          const latestBlock = newBlocks[0];
          const olderBlock = newBlocks[newBlocks.length - 1];
          const timeDiff = Number(latestBlock.timestamp) - Number(olderBlock.timestamp);
          const tps = timeDiff > 0 ? Math.round(totalTxns / timeDiff) : 0;
          setRealTPS(Math.max(tps, avgTxns)); // Use average as minimum
        } else {
          setRealTPS(avgTxns);
        }
      } catch (error) {
        console.error("Gagal mengambil blok terakhir:", error);
      }
    };

    fetchBlocks();
  }, [blockNumber, publicClient]);

  const handleBlockSelect = (block: BlockWithTransactions) => {
    if (selectedBlock?.hash === block.hash) {
      setSelectedBlock(null);
    } else {
      setSelectedBlock(block);
    }
  };

  return (
    <div className="container">
      {/* Flight Control Panel */}
      <div className="cockpit-instruments">
        <Altimeter blockNumber={blockNumber} />
        <SpeedIndicator transactionCount={averageTxnCount} realTPS={realTPS} />
        <NetworkStatus recentBlocks={recentBlocks} />
        <HeadingCompass />
      </div>

      <header className="header">
        <div className="header-content">
          <h1>
            ✈️ MONADPORT CONTROL TOWER <span className="live-indicator">●</span>
          </h1>
          <a 
            href="https://github.com/sultonyana4" 
            target="_blank" 
            rel="noopener noreferrer"
            className="github-link"
            title="View on GitHub"
          >
            <svg 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="currentColor"
            >
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
          </a>
        </div>
        <p>Monad Testnet Flight Information Dashboard</p>
      </header>

      <main className="main-content">
        <div className="departure-board">
          <div className="board-header">
            <span>🛫 AIRLINE</span>
            <span>FLIGHT (BLOCK)</span>
            <span>PASSENGERS (TXs)</span>
            <span>STATUS</span>
          </div>
          {recentBlocks.length > 0 ? (
            recentBlocks.map((block) => {
              const airlineIndex = Number(block.number % BigInt(airlineLogos.length));
              const airlineLogo = airlineLogos[airlineIndex];

              return (
                <div key={block.hash}>
                  <div 
                    className={`board-row ${selectedBlock?.hash === block.hash ? 'selected' : ''}`}
                    onClick={() => handleBlockSelect(block)}
                  >
                    <span className="airline-logo-container">
                      <span className="airline-emoji">{airlineLogo}</span>
                    </span>
                    <span>MND-{block.number.toString()}</span>
                    <span className="passenger-count">
                      {block.transactions.length}
                    </span>
                    <span className="status-departed">DEPARTED</span>
                  </div>
                  {selectedBlock?.hash === block.hash && (
                    <div className="transaction-details">
                      <div className="transaction-header">
                          <span>NO.</span>
                          <span>TX HASH</span>
                          <span>FROM</span>
                          <span>TO</span>
                      </div>
                      {selectedBlock.transactions.map((tx: Transaction, index: number) => (
                        <TransactionRow key={tx.hash} tx={tx} index={index} />
                      ))}
                    </div>
                  )}
                </div>
              )
            })
          ) : (
            <div className="board-row">
                <span>Loading...</span>
                <span>...</span>
                <span>...</span>
                <span>...</span>
            </div>
          )}
        </div>
        
        {/* Flight Status Display */}
        {selectedBlock && (
          <div className="flight-manifest">
            <h3>🛫 Flight MND-{selectedBlock.number.toString()} Manifest</h3>
            <div className="manifest-info">
              <div className="manifest-detail">
                <span>Flight Hash:</span>
                <span>{selectedBlock.hash.slice(0, 10)}...{selectedBlock.hash.slice(-6)}</span>
              </div>
              <div className="manifest-detail">
                <span>Departure Time:</span>
                <span>{new Date(Number(selectedBlock.timestamp) * 1000).toLocaleTimeString()}</span>
              </div>
              <div className="manifest-detail">
                <span>Total Passengers:</span>
                <span>{selectedBlock.transactions.length}</span>
              </div>
            </div>
          </div>
        )}
        
        <div className="info-footer">
          🛬 Latest Block: {blockNumber?.toString() ?? 'Loading...'}
        </div>
      </main>
    </div>
  );
}

// Fixed: removed monanimals reference
export default App;
