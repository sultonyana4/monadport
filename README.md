# ✈️ Monadport Control Tower

**A flight-themed blockchain explorer for Monad Testnet**

![Monadport Banner](https://img.shields.io/badge/Monad-Testnet-blue?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDJMMTMuMDkgOC4yNkwyMCA5TDEzLjA5IDE1Ljc0TDEyIDIyTDEwLjkxIDE1Ljc0TDQgOUwxMC45MSA4LjI2TDEyIDJaIiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4K)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)

## 🚀 Overview

Monadport Control Tower is an innovative blockchain explorer that transforms the traditional block explorer experience into an immersive aviation-themed dashboard. Monitor Monad Testnet activity as if you're managing air traffic control at a busy international airport!

### ✨ Key Features

- **🛫 Flight Departure Board**: Recent blocks displayed as departing flights
- **🎛️ Cockpit Instruments**: Real-time metrics in aviation-style gauges
  - **Altimeter**: Current block height
  - **Speed Indicator**: Transaction throughput (TPS)
  - **Network Status**: Connection health monitoring
  - **Heading Compass**: Animated directional indicator
- **✈️ Flight Manifest**: Detailed transaction viewer for each block
- **🌤️ Immersive UI**: Sky background with floating clouds animation
- **📱 Responsive Design**: Works seamlessly on desktop and mobile

## 🎮 Live Demo

🔗 **[Visit Monadport Control Tower](https://monadport.vercel.app/)** 

## 🛠️ Tech Stack

- **Frontend Framework**: React 18+ with TypeScript
- **Build Tool**: Vite
- **Blockchain Integration**: 
  - [Wagmi](https://wagmi.sh/) - React hooks for Ethereum
  - [Viem](https://viem.sh/) - TypeScript interface for Ethereum
- **Styling**: Custom CSS with aviation-themed design
- **State Management**: React hooks and TanStack Query
- **Network**: Monad Testnet RPC

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and pnpm
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/sultonyana4/monadport.git
   cd monadport
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Start development server**
   ```bash
   pnpm dev
   ```

4. **Open your browser**
   ```
   http://localhost:5173
   ```

## 🔧 Available Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server |
| `pnpm build` | Build for production |
| `pnpm preview` | Preview production build |
| `pnpm lint` | Run ESLint |

## 🌐 Network Configuration

The application is configured to connect to **Monad Testnet**:

- **Chain ID**: 80084
- **RPC URL**: https://testnet-rpc.monad.xyz
- **Explorer**: https://testnet.monadexplorer.com
- **Native Token**: MON (Monad)

## 📱 Features Deep Dive

### 🎛️ Cockpit Instruments

**Altimeter (Block Height)**
- Displays current blockchain height in aviation altitude format
- Updates in real-time as new blocks are mined

**Speed Indicator (TPS)**
- Shows real-time transaction throughput
- Calculates average transactions per block
- Displays both real TPS and average metrics

**Network Status**
- Real-time connection monitoring
- Color-coded status indicators:
  - 🟢 **ONLINE**: 5/5 recent blocks loaded
  - 🟡 **DELAYED**: 3-4/5 recent blocks loaded  
  - 🔴 **OFFLINE**: <3/5 recent blocks loaded

**Heading Compass**
- Animated directional indicator
- Adds dynamic visual element to the cockpit

### 🛫 Flight Departure Board

- **Latest 5 blocks** displayed as departing flights
- **Airline themes** with rotating emoji indicators
- **Flight numbers** based on block numbers (MND-{blockNumber})
- **Passenger count** shows transaction count per block
- **Interactive rows** - click to view transaction details

### ✈️ Flight Manifest

- **Detailed transaction viewer** for selected blocks
- **Transaction list** with from/to addresses
- **Block metadata** including hash and timestamp
- **Passenger manifest** metaphor for transaction data

## 🎨 Design Philosophy

Monadport transforms blockchain data into an engaging aviation experience:

- **Immersive Theme**: Complete aviation/cockpit aesthetic
- **Intuitive Metaphors**: Blocks as flights, transactions as passengers
- **Real-time Updates**: Live data streaming like air traffic control
- **Visual Feedback**: Animated elements and status indicators
- **Responsive Layout**: Works on all device sizes

## 🔮 Future Enhancements

- [ ] **Transaction filtering** by type and value
- [ ] **Historical data charts** and analytics
- [ ] **Sound effects** for enhanced immersion
- [ ] **Multiple airline themes** and customization
- [ ] **Flight tracking map** visualization
- [ ] **WebSocket integration** for instant updates
- [ ] **Dark/light mode** toggle
- [ ] **Export functionality** for block data

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Sulton Yana**
- GitHub: [@sultonyana4](https://github.com/sultonyana4)
- Website: *[Your website URL]*

## 🙏 Acknowledgments

- [Monad Labs](https://monad.xyz/) for the innovative blockchain platform
- [Wagmi](https://wagmi.sh/) and [Viem](https://viem.sh/) teams for excellent Web3 tooling
- Aviation industry for design inspiration
- Open source community for amazing tools and libraries

## 📞 Support

If you have any questions or need support, please:
- Open an issue on GitHub
- Contact me via GitHub profile

---

<div align="center">

**🛫 Ready for takeoff? Start exploring Monad Testnet! ✈️**

Made with ❤️ and ☁️ by [Sulton Yana](https://github.com/sultonyana4)

</div>
