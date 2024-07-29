import React from 'react';
import ReactDOM from 'react-dom/client';
import { DAppProvider } from '@usedapp/core';
import { getDefaultProvider } from 'ethers';
import App from './App.jsx';
import './index.css';

const arbitrumChainId = 42161; // Arbitrum One chain ID in decimal

const config = {
  readOnlyChainId: arbitrumChainId,
  readOnlyUrls: {
    [arbitrumChainId]: getDefaultProvider('https://arbitrum-one-rpc.publicnode.com'), // Official Arbitrum public RPC
  },
  networks: [{ chainId: arbitrumChainId, name: 'Arbitrum One' }]
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <DAppProvider config={config}>
      <App />
    </DAppProvider>
  </React.StrictMode>,
);
