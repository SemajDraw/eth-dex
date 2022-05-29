const EthDex = artifacts.require('EthDex');
const EthSwap = artifacts.require('EthSwap');
const truffleAssert = require('truffle-assertions');
import('chai').then((chai) => chai.use(require('chai-as-promised')).should());

const toWei = (n) => {
  return web3.utils.toWei(n, 'ether');
};

const EthDexConfig = {
  INITIAL_SUPPLY: toWei('1000000000'),
  TOKEN_NAME: 'EthDex Token',
  DECIMAL_UNITS: 18,
  TOKEN_SYMBOL: 'ETHDEX',
};

contract('EthSwap', async ([deployer, investor]) => {
  let ethSwap;
  let ethDex;

  before(async () => {
    ethDex = await EthDex.new(
      EthDexConfig.INITIAL_SUPPLY,
      EthDexConfig.TOKEN_NAME,
      EthDexConfig.DECIMAL_UNITS,
      EthDexConfig.TOKEN_SYMBOL
    );
    ethSwap = await EthSwap.new(ethDex.address);

    await ethDex.transfer(ethSwap.address, await ethDex.totalSupply());
  });
  describe('deployment', async () => {
    it('contract has correct name', async () => {
      assert.equal(await ethSwap.name(), 'EthSwap Instant Exchange');
    });

    it('contract has EthDex tokens', async () => {
      const balance = await ethDex.balanceOf(ethSwap.address);
      assert.equal(balance, EthDexConfig.INITIAL_SUPPLY);
    });
  });

  describe('buyTokens function', async () => {
    let transaction;

    before(async () => {
      transaction = await ethSwap.buyTokens({
        from: investor,
        value: toWei('1'),
      });
    });

    it('investor credited with EthDex token', async () => {
      const investorBalance = await ethDex.balanceOf(investor);
      assert.equal(investorBalance, toWei('100'));
    });

    it('contract debited EthDex token & credited ether', async () => {
      const ethDexBalance = await ethDex.balanceOf(ethSwap.address);
      assert.equal(
        BigInt(ethDexBalance),
        BigInt(EthDexConfig.INITIAL_SUPPLY) - BigInt(toWei('100'))
      );

      const ethBalance = await web3.eth.getBalance(ethSwap.address);
      assert.equal(ethBalance.toString(), toWei('1'));
    });

    it('TokenBought event emmited', async () => {
      truffleAssert.eventEmitted(transaction, 'TokenBought', async (event) => {
        assert.equal(event['0'], investor);
        assert.equal(event['1'], ethDex.address);
        return;
      });
    });
  });

  describe('sellTokens function', async () => {
    let transaction;

    before(async () => {
      transaction = await ethSwap.sellTokens(toWei(100));
    });
  });
});
