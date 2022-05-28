const EthDex = artifacts.require('EthDex');
const truffleAssert = require('truffle-assertions');

const EthDexConfig = {
  INITIAL_SUPPLY: '1000000000000000000000000000',
  TOKEN_NAME: 'EthDex Token',
  DECIMAL_UNITS: 18,
  TOKEN_SYMBOL: 'ETHDEX',
};

const tokens = (n) => {
  return web3.utils.toWei(n, 'ether');
};

contract('EthDex', async () => {
  let ethDex;
  let owner;
  let value;
  const mockAddress = '0xb27fa9f8561eb0964dfec0da698cefb4074497c5';

  before(async () => {
    ethDex = await EthDex.new(
      EthDexConfig.INITIAL_SUPPLY,
      EthDexConfig.TOKEN_NAME,
      EthDexConfig.DECIMAL_UNITS,
      EthDexConfig.TOKEN_SYMBOL
    );
    owner = await ethDex.owner();
    value = tokens('100');
  });

  it('contract has correct name', async () => {
    assert.equal(await ethDex.name(), EthDexConfig.TOKEN_NAME);
  });

  it('contract has correct initialSupply', async () => {
    assert.equal(await ethDex.totalSupply(), EthDexConfig.INITIAL_SUPPLY);
  });

  it('contract has correct decimalUnits', async () => {
    assert.equal(await ethDex.decimals(), EthDexConfig.DECIMAL_UNITS);
  });

  it('contract has correct initialSupply', async () => {
    assert.equal(await ethDex.symbol(), EthDexConfig.TOKEN_SYMBOL);
  });

  it('owner has correct balance', async () => {
    const balance = await ethDex.balanceOf(await ethDex.owner());
    assert.equal(balance, EthDexConfig.INITIAL_SUPPLY);
  });

  it('approve returns true', async () => {
    const value = tokens('100');
    const approve = await ethDex.approve(mockAddress, value);

    assert.isTrue(approve.receipt.status);
  });

  it('transfer event is emmited', async () => {
    const initialBalanceOwner = await ethDex.balanceOf(owner);
    const transfer = await ethDex.transfer(mockAddress, value);
    const balanceOwner = await ethDex.balanceOf(owner);
    const balanceReceiver = await ethDex.balanceOf(mockAddress);

    truffleAssert.eventEmitted(transfer, 'Transfer', async (event) => {
      return (
        event.from === owner &&
        event.to === mockAddress &&
        event.value === value
      );
    });
    assert.isBelow(
      Number(balanceOwner),
      Number(initialBalanceOwner) - Number(value)
    );
    assert.equal(balanceReceiver, value);
  });

  it('transfer event is emmited by transferFrom', async () => {
    const initialBalanceOwner = await ethDex.balanceOf(owner);
    const approve = await ethDex.approve(owner, value);
    const transfer = await ethDex.transferFrom(owner, mockAddress, value);
    const balanceOwner = await ethDex.balanceOf(owner);
    const balanceReceiver = await ethDex.balanceOf(mockAddress);

    truffleAssert.eventEmitted(transfer, 'Transfer', async (event) => {
      return (
        event.from === owner &&
        event.to === mockAddress &&
        event.value === value
      );
    });
    assert.equal(
      Number(balanceOwner),
      Number(initialBalanceOwner) - Number(value)
    );
    assert.equal(Number(balanceReceiver), Number(tokens('200')));
  });

  it('burn event is emmited', async () => {
    const initialBalanceOwner = await ethDex.balanceOf(owner);
    const burn = await ethDex.burn(value);
    const balanceOwner = await ethDex.balanceOf(owner);

    truffleAssert.eventEmitted(burn, 'Burn', async (event) => {
      return event.from === owner && event.value === value;
    });
    assert.equal(
      Number(balanceOwner),
      Number(initialBalanceOwner) - Number(value)
    );
  });

  it('freeze event is emmited', async () => {
    const initialBalanceOwner = await ethDex.balanceOf(owner);
    const freeze = await ethDex.freeze(value);
    const balanceOwner = await ethDex.balanceOf(owner);

    truffleAssert.eventEmitted(freeze, 'Freeze', async (event) => {
      return event.from === owner && event.value === value;
    });
    assert.isBelow(
      Number(balanceOwner),
      Number(initialBalanceOwner) - Number(value)
    );
  });

  it('unfreeze event is emmited', async () => {
    const initialBalanceOwner = await ethDex.balanceOf(owner);
    const unfreeze = await ethDex.unfreeze(value);
    const balanceOwner = await ethDex.balanceOf(owner);

    truffleAssert.eventEmitted(unfreeze, 'Unfreeze', async (event) => {
      return event.from === owner && event.value === value;
    });
    assert.isAbove(Number(balanceOwner), Number(initialBalanceOwner));
  });
});
