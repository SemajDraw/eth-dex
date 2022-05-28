const EthDex = artifacts.require('EthDex');
const EthSwap = artifacts.require('EthSwap');
import('chai').then((chai) => chai.use(require('chai-as-promised')).should());

const EthDexConfig = {
  INITIAL_SUPPLY: '1000000000000000000000000000',
  TOKEN_NAME: 'EthDex Token',
  DECIMAL_UNITS: 18,
  TOKEN_SYMBOL: 'ETHDEX',
};

contract('EthSwap', async (accounts) => {
  let ethSwap;
  let ethDex;

  before(async () => {
    ethSwap = await EthSwap.new();
    ethDex = await EthDex.new(
      EthDexConfig.INITIAL_SUPPLY,
      EthDexConfig.TOKEN_NAME,
      EthDexConfig.DECIMAL_UNITS,
      EthDexConfig.TOKEN_SYMBOL
    );

    await ethDex.transfer(ethSwap.address, await ethDex.totalSupply());
  });

  it('contract has correct name', async () => {
    assert.equal(await ethSwap.name(), 'EthSwap Instant Exchange');
  });

  it('contract has EthDex tokens', async () => {
    const balance = await ethDex.balanceOf(ethSwap.address);
    assert.equal(balance, EthDexConfig.INITIAL_SUPPLY);
  });
});
