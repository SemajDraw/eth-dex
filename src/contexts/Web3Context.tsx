import { createContext, useContext, useState } from 'react';
import Web3 from 'web3';
import { Props } from '../interfaces/component';

interface Account {
  address?: string | undefined;
  balance?: string | undefined;
}

export const useWeb3 = () => {
  const [web3, setWeb3] = useState<Web3 | null>(null);
  const [account, setAccount] = useState<Account>({});

  const connectWallet = async () => {
    if (window.ethereum) {
      // Instantiate Web3
      const web3 = new Web3(Web3.givenProvider);
      setWeb3(web3);

      // Get current account
      const [address] = await web3.eth.requestAccounts();
      const balance = await web3.eth.getBalance(address);

      setAccount({ address, balance });
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
