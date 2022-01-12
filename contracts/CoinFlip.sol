// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.11;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v4.4.2/contracts/access/AccessControl.sol";

contract CoinFlip is AccessControl {
    uint _minBet = 10000000000000000; // default minimum bet is 0.01

    constructor() {
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender); // set owner as admin
    }

    modifier onlyAdmin() {
        // this modifier restricts function calls to only succeed when caller has admin role
        require(hasRole(DEFAULT_ADMIN_ROLE, msg.sender));
    }
}