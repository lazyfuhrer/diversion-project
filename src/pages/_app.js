import { createClient as createClien, Provider } from 'urql';

import {
  LivepeerConfig,
  createReactClient,
  studioProvider,
} from '@livepeer/react';

import '@rainbow-me/rainbowkit/styles.css';
import {
  ConnectButton,
  darkTheme,
  getDefaultWallets,
  midnightTheme,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { configureChains, createClient, goerli, WagmiConfig } from 'wagmi';
import { mainnet, polygon, optimism, arbitrum, polygonMumbai } from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import { ChakraProvider } from '@chakra-ui/react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
const { chains, provider } = configureChains(
  [polygonMumbai, mainnet, polygon, optimism, arbitrum, goerli],
  [
    alchemyProvider({ apiKey: "wOpAEigBzxZiFz8pAjpEeFkX9T0_PM_m" }),
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
  provider: studioProvider({ apiKey: '1181ec78-91c2-41c9-97e6-d435ad3bef1b' }),
});

export default function App({ Component, pageProps }) {
  return (
    <Provider value={client}>
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider chains={chains} coolMode>
          <LivepeerConfig client={clien}>
            <ChakraProvider>
              <Navbar />
              <Component {...pageProps} />
            </ChakraProvider>  
          </LivepeerConfig>
        </RainbowKitProvider>
      </WagmiConfig>
      <Footer/>
    </Provider>  
  )
}