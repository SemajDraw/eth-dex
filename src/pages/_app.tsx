import '../styles/styles.css';
import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { Layout } from '../components/layout/Layout';
import theme from '../theme';
import { Web3Provider } from '../contexts/Web3Context';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Web3Provider>
      <ChakraProvider resetCSS theme={theme}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </Web3Provider>
  );
}

export default MyApp;
