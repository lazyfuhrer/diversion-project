import { createClient as createClien, Provider } from 'urql';

import {
  LivepeerConfig,
  createReactClient,
  studioProvider,
} from '@livepeer/react';

import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { configureChains, createClient, goerli, WagmiConfig } from 'wagmi';
import { mainnet, polygon, optimism, arbitrum, polygonMumbai } from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import { ChakraProvider } from '@chakra-ui/react';
import Navbar from '@/components/Navbar';
//import Footer from './components/Footer';
import Footer from '@/components/Footer';

const fireChain = {
  id: 997,
  name: '5ire Testnet',
  network: '5ire',
  iconUrl: 'https://example.com/icon.svg',
  iconBackground: '#fff',
  nativeCurrency: {
    decimals: 18,
    name: '5ire Testnet',
    symbol: '5IRE',
  },
  rpcUrls: {
    default: {
      http: ['https://rpc-testnet.5ire.network'],
    },
  },
  blockExplorers: {
    default: { name: '5ireScan', url: 'https://explorer.5ire.network/evm' },
    etherscan: { name: '5ireScan', url: 'https://explorer.5ire.network/evm' },
  },
  testnet: true,
};

const { chains, provider } = configureChains(
  [polygonMumbai, fireChain, goerli, mainnet, polygon, optimism, arbitrum],
  [
    alchemyProvider({ apiKey: "PwIu9eXDc12d70YQbkJVUX8PHUyQE8LV" }),
    publicProvider()
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'My RainbowKit App',
  chains
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider
})

const client = createClien({
  url: 'https://api.studio.thegraph.com/query/41353/video-data-graph/0.1',
});

const clien = createReactClient({
  provider: studioProvider({ apiKey: "1181ec78-91c2-41c9-97e6-d435ad3bef1b" }),
});

export default function App({ Component, pageProps }) {
  return (
    <>
    <Provider value={client}>
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider chains={chains} coolMode>
          <LivepeerConfig client={clien}>
            <ChakraProvider>
              <Navbar />
              <Component {...pageProps} />
              <Footer/>
            </ChakraProvider>  
          </LivepeerConfig>
        </RainbowKitProvider>
      </WagmiConfig>
    </Provider>  
    </>
  )
}