// SPDX-License-Identifier: MIT
pragma solidity ^0.8.14;

import './EthDex.sol';

contract EthSwap {
    string public _name = 'EthSwap Instant Exchange';
    EthDex public ethDex;
    uint256 public rate = 100;

    event TokenBought(
        address account,
        address token,
        uint256 amount,
        uint256 rate
    );

    constructor(EthDex _ethDex) {
        ethDex = _ethDex;
    }

    function buyTokens() public payable {
        // Calculate the number of EthDex tokens to purchase
        uint256 tokenAmount = msg.value * rate;

        // Require EthSwap has enough tokens
        require(
            ethDex.balanceOf(address(this)) >= tokenAmount,
            'Insufficient Tokens'
        );
        ethDex.transfer(msg.sender, tokenAmount);

        // Emit a token bought event
        emit TokenBought(msg.sender, address(ethDex), tokenAmount, rate);
    }

    function name() public view returns (string memory) {
        return _name;
    }
}
