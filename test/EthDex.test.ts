import { EthDexConfig } from '../src/constants/contracts';
import { EthDexInstance } from '../types/truffle-contracts';

const EthDex = artifacts.require('EthDex');

contract('EthDex', async () => {
  let ethDex: EthDexInstance;

  before(async () => {
    await deployer.deploy(
      EthDex,
      EthDexConfig.INITIAL_SUPPLY,
      EthDexConfig.TOKEN_NAME,
      EthDexConfig.DECIMAL_UNITS,
      EthDexConfig.TOKEN_SYMBOL
    );
    ethDex = await EthDex.deployed();
  });

  it('contract has correct name', async () => {
    assert.equal(await ethDex.name(), EthDexConfig.TOKEN_NAME);
  });
});

export {};
