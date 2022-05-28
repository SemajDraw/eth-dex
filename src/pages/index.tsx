import { Box } from '@chakra-ui/react';
import type { NextPage } from 'next';
import Head from 'next/head';

const Home: NextPage = () => {
  return (
    <Box>
      <Head>
        <title>EthDex</title>
        <meta name="description" content="Basic Eth Dex" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </Box>
  );
};

export default Home;
