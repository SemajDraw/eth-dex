const EthDex = artifacts.require('EthDex');
const EthSwap = artifacts.require('EthSwap');
require('chai').use(require('chai-as-promised')).should();

contract('EthSwap', async (accounts) => {
  describe('deployment', async () => {
    it('contract has correct name', async () => {
      const ethSwap = await EthSwap.deployed();
      const name = await ethSwap.name();
      assert.equal(name, 'EthSwap Instant Exchange');
    });
  });
});
