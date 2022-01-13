// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.11;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v4.4.2/contracts/access/AccessControl.sol";

contract CoinFlip is AccessControl {
    uint _minBet = 10000000000000000; // default minimum bet is 0.01 ETH in wei units
    uint _maxBet = 5000000000000000000; // default maximum bet is 5 ETH in wei units
    uint _playerWinPercentage = 50; // default winning percentage is 50%

    constructor() {
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender); // set owner as admin
    }

    // needed to receive eth
    receive() external payable { }

    modifier onlyAdmin() {
        // this modifier restricts function calls to only succeed when caller has admin role
        require(hasRole(DEFAULT_ADMIN_ROLE, msg.sender));
        _;
    }

    // state getters and updaters    
    function setMinBet(uint amountWei) public onlyAdmin { _minBet = amountWei; }
    function getMinBet() public view onlyAdmin returns (uint) { return _minBet; }
    function setMaxBet(uint amountWei) public onlyAdmin { _maxBet = amountWei; }
    function getMaxBet() public view onlyAdmin returns (uint) { return _maxBet; }
    function setPlayerWinPercentage(uint percentage) public onlyAdmin { 
        require(percentage <= 100, "Player win percentage must be 100% or less");
        _playerWinPercentage = percentage; 
    }
    function getWinPercentage() public view onlyAdmin returns (uint) { return _playerWinPercentage; }

    // returns the amount held in this contract
    function getBalance() public view onlyAdmin returns (uint) { return address(this).balance; }
}