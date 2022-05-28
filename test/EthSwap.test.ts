import { assert } from 'console';
import { Item } from 'framer-motion/types/components/Reorder/Item';

const EthDex = artifacts.require('EthDex');
const EthSwap = artifacts.require('EthSwap');
require('chai').use(require('chai-as-promised')).should();

contract('EthSwap', (accounts) => {
  describe('EthSwap deployment', async () => {
    const ethSwap = await EthSwap.new();

    it('contract has correct name', async () => {
      const name = await ethSwap.name();
      assert.equal(name, 'EthSwap Instant Exchange');
    });
  });
});
