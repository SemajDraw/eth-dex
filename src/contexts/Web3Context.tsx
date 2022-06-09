import { createContext, useContext, useEffect, useState } from 'react';
import Web3 from 'web3';
import { Contract } from 'web3-eth-contract';
import { Props } from '../interfaces/component';
// import { EthDexContract, EthSwapContract } from '../../types/truffle-contracts';
import EthDex from '../../build/contracts/EthDex.json';
import EthSwap from '../../build/contracts/EthSwap.json';
import { useCookies } from 'react-cookie';
interface Account {
  address?: string;
  ethBalance?: string;
  ethDexBalance?: string;
}

interface Contracts {
  ethDex?: Contract;
  ethSwap?: Contract;
}

export const useWeb3 = () => {
  const [cookies, setCookie] = useCookies(['__meta']);
  const [web3, setWeb3] = useState<Web3 | null>(null);
  const [account, setAccount] = useState<Account>({});
  const [contracts, setContracts] = useState<Contracts>({});

  useEffect(() => {
    if (cookies?.__meta?.isConnected) {
      console.log(cookies?.__meta?.isConnected);
      connectWallet();
    }
  }, []);

  const connectWallet = async () => {
    if (window.ethereum) {
      // Instantiate Web3
      const web3 = new Web3(Web3.givenProvider);
      setWeb3(web3);

      // Get current account
      const [address] = await web3.eth.requestAccounts();

      // Get the ETH balance
      const ethBalance = await web3.eth.getBalance(address);

      // Get the network ID
      const network = await web3.eth.net.getId();
      const a = (EthSwap.networks as any)[network];

      console.log('here', a);

      // Get the contracts
      const ethDex = await new web3.eth.Contract(
        EthDex.abi as AbiItem[],
        (EthDex.networks as any)[network]?.address
      );
      const ethSwap = await new web3.eth.Contract(
        EthSwap.abi as AbiItem[],
        (EthSwap.networks as any)[network]?.address
      );

      console.log(ethDex);
      console.log(address);

      // Get ETH dex balance
      const ethDexBalance = await ethDex.methods.balanceOf(address).call();

      // console.log('bal', ethDexBalance);

      console.log('bal', ethDexBalance);
      setContracts({ ethDex, ethSwap });
      setAccount({ address, ethBalance });
      setCookie('__meta', { isConnected: true }, { path: '/' });
    } else {
      console.log('Please install a Web3 browser');
    }
  };

  return { web3, account, connectWallet };
};

export const Web3Context = createContext({} as ReturnType<typeof useWeb3>);

export const Web3Provider = ({ children }: Props) => (
  <Web3Context.Provider value={useWeb3()}>{children}</Web3Context.Provider>
);

export const useWeb3Context = () => useContext(Web3Context);
