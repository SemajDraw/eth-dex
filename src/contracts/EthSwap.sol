// SPDX-License-Identifier: MIT
pragma solidity ^0.8.14;

import './EthDex.sol';

contract EthSwap {
    string public _name = 'EthSwap Instant Exchange';
    EthDex public ethDex;
    uint256 public rate = 100;

    constructor(EthDex _ethDex) {
        ethDex = _ethDex;
    }

    function buyTokens() public payable {
        // Calculate the number of EthDex tokens to purchase
        uint256 _value = msg.value * rate;
        ethDex.transfer(msg.sender, _value);
    }

    function name() public view returns (string memory) {
        return _name;
    }
}
