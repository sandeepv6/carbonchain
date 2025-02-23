const contractPerNetwork = {
  mainnet: 'carbon-footprint.mainnet',
  testnet: 'karanjots.testnet',
};

// Chains for EVM Wallets 
const evmWalletChains = {
  mainnet: {
    chainId: 397,
    name: "Near Mainnet",
    explorer: "https://eth-explorer.near.org",
    rpc: "https://eth-rpc.mainnet.near.org",
  },
  testnet: {
    chainId: 398,
    name: "Near Testnet",
    explorer: "https://eth-explorer-testnet.near.org",
    rpc: "https://eth-rpc.testnet.near.org",
  },
}

export const NetworkId = 'testnet';
export const CarbonFootprintContract = contractPerNetwork[NetworkId];
export const EVMWalletChain = evmWalletChains[NetworkId];
