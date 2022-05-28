const EthDex = artifacts.require("EthDex");
const EthSwap = artifacts.require("EthSwap");

module.exports = async function (deployer) {
  // Deploy EthDex Token
  await deployer.deploy(EthDex, 100000000000, "EthDex Token", 18, "ETHDEX");
  const ethDex = await EthDex.deployed();

  // Deploy EthSwap
  await deployer.deploy(EthSwap);
  const ethSwap = await EthSwap.deployed();

  // Transfer all tokens to the EthSwap Exchange
  await ethDex.transfer(ethSwap.address, await ethDex.totalSupply());
};
