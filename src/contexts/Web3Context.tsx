import { createContext, useContext, useEffect, useState } from 'react';
import Web3 from 'web3';
import { Props } from '../interfaces/component';
import { EthDexContract, EthSwapContract } from '../../types/truffle-contracts';
import EthDex from '../../build/contracts/EthDex.json';
import EthSwap from '../../build/contracts/EthSwap.json';
import { useCookies } from 'react-cookie';
interface Account {
  address?: string;
  ethBalance?: string;
}

interface Contracts {
  ethDex?: EthDexContract;
  ethSwap?: EthSwapContract;
}

export const useWeb3 = () => {
  const [cookies, setCookie] = useCookies(['__meta']);
  const [web3, setWeb3] = useState<Web3 | null>(null);
  const [account, setAccount] = useState<Account>({});
  const [contracts, setContracts] = useState<Contracts>({});

  useEffect(() => {
    if (cookies?.__meta?.isConnected) {
      connectWallet();
    }
  }, []);

  const connectWallet = async () => {
    if (window.ethereum) {
      // Instantiate Web3
      const web3 = new Web3(Web3.givenProvider);
      setWeb3(web3);

      // Set current account
      const [address] = await web3.eth.requestAccounts();
      const ethBalance = await web3.eth.getBalance(address);
      setAccount({ address, ethBalance });

      try {
        // Set the contracts
        const network = await web3.eth.net.getId();
        const ethDex = (await new web3.eth.Contract(
          EthDex.abi as AbiItem[],
          (EthDex.networks as any)[network].address
        )) as any as EthDexContract;
        const ethSwap = (await new web3.eth.Contract(
          EthSwap.abi as AbiItem[],
          (EthSwap.networks as any)[network].address
        )) as any as EthSwapContract;

        setContracts({ ethDex, ethSwap });
      } catch (error) {
        console.log(error?.message);
      }

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
