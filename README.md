# Carbon Chain - Hack Canada 2025

This project is a blockchain-based platform built on the NEAR protocol, designed to incentivize carbon footprint reduction initiatives. It allows users to submit their carbon reduction efforts, which are then verified by staff. Upon verification, users are rewarded with fungible tokens that represent their contribution to reducing carbon emissions.

## Features

- **User Dashboard**: Submit and track carbon reduction initiatives.
- **Staff Dashboard**: Review and verify submitted initiatives.
- **Token Minting**: Mint tokens based on verified carbon reduction.
- **NEP-141 Compliance**: Implements NEAR's fungible token standard for token management.

## Technologies Used

- **Next.js**: Frontend framework for building the user interface.
- **NEAR Protocol**: Blockchain platform for deploying smart contracts.
- **NEP-141**: Standard for fungible tokens on NEAR.
- **React**: JavaScript library for building user interfaces.
- **TypeScript**: Superset of JavaScript for type safety.

## Getting Started

### Prerequisites

- Node.js (>=18)
- NEAR CLI
- NEAR Testnet Account

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/carbon-footprint-platform.git
   cd carbon-footprint-platform
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up NEAR environment**:
   - Install NEAR CLI: `npm install -g near-cli`
   - Log in to NEAR: `near login`

4. **Deploy the smart contract**:
   - Compile and deploy the contract:
     ```bash
     npm run build
     near deploy --accountId <your-account-id> --wasmFile build/contract.wasm
     ```

### Running the Application

1. **Start the development server**:
   ```bash
   npm run dev
   ```

2. **Open your browser**:
   - Visit [http://localhost:3000](http://localhost:3000) to view the application.

## Usage

- **User Dashboard**: Upload documents detailing carbon reduction initiatives. Track the status of submissions and view token balance.
- **Staff Dashboard**: Review pending initiatives and verify them to mint tokens for users.

### NEAR Protocol

- [NEAR Documentation](https://docs.near.org) - Learn about NEAR's blockchain platform.
- [NEP-141 Standard](https://nomicon.io/Standards/Tokens/FungibleTokenCore) - Understand the fungible token standard on NEAR.

### Next.js

- [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - Interactive Next.js tutorial.

## Contributors
- [Karanjot Gaidu](https://github.com/karanjot-gaidu)
- [Sandeep Virk](https://github.com/sandeepv6)
- [Vishesh Gupta](https://github.com/VG-05)

