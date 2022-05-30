import { Box, Flex } from '@chakra-ui/react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { Swap } from '../components/Swap';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>EthDex</title>
        <meta name="description" content="Basic Eth Dex" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Swap />
    </>
  );
};

export default Home;
