/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import BN from 'bn.js';
import { EventData, PastEventOptions } from 'web3-eth-contract';

export interface EthSwapContract extends Truffle.Contract<EthSwapInstance> {
  'new'(
    _ethDex: string,
    meta?: Truffle.TransactionDetails
  ): Promise<EthSwapInstance>;
}

type AllEvents = never;

export interface EthSwapInstance extends Truffle.ContractInstance {
  _name(txDetails?: Truffle.TransactionDetails): Promise<string>;

  ethDex(txDetails?: Truffle.TransactionDetails): Promise<string>;

  rate(txDetails?: Truffle.TransactionDetails): Promise<BN>;

  buyTokens: {
    (txDetails?: Truffle.TransactionDetails): Promise<
      Truffle.TransactionResponse<AllEvents>
    >;
    call(txDetails?: Truffle.TransactionDetails): Promise<void>;
    sendTransaction(txDetails?: Truffle.TransactionDetails): Promise<string>;
    estimateGas(txDetails?: Truffle.TransactionDetails): Promise<number>;
  };

  name(txDetails?: Truffle.TransactionDetails): Promise<string>;

  methods: {
    _name(txDetails?: Truffle.TransactionDetails): Promise<string>;

    ethDex(txDetails?: Truffle.TransactionDetails): Promise<string>;

    rate(txDetails?: Truffle.TransactionDetails): Promise<BN>;

    buyTokens: {
      (txDetails?: Truffle.TransactionDetails): Promise<
        Truffle.TransactionResponse<AllEvents>
      >;
      call(txDetails?: Truffle.TransactionDetails): Promise<void>;
      sendTransaction(txDetails?: Truffle.TransactionDetails): Promise<string>;
      estimateGas(txDetails?: Truffle.TransactionDetails): Promise<number>;
    };

    name(txDetails?: Truffle.TransactionDetails): Promise<string>;
  };

  getPastEvents(event: string): Promise<EventData[]>;
  getPastEvents(
    event: string,
    options: PastEventOptions,
    callback: (error: Error, event: EventData) => void
  ): Promise<EventData[]>;
  getPastEvents(event: string, options: PastEventOptions): Promise<EventData[]>;
  getPastEvents(
    event: string,
    callback: (error: Error, event: EventData) => void
  ): Promise<EventData[]>;
}
