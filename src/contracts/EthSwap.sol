// SPDX-License-Identifier: MIT
pragma solidity ^0.8.14;

contract EthSwap {
    string public _name = 'EthSwap Instant Exchange';

    function name() public view returns (string memory) {
        return _name;
    }
}
