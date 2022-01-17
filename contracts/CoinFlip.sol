// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.11;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v4.4.2/contracts/access/AccessControl.sol";

contract CoinFlip is AccessControl {
    uint _minBet = 10000000000000000; // default minimum bet is 0.01 ETH in wei units
    uint _maxBet = 2000000000000000000; // default maximum bet is 2 ETH in wei units
    uint _playerWinPercentage = 49; // default winning percentage is 49%
    uint _randNonce = 0;
    uint _commissionBasisPoints = 350;

    // events
    event fundsReceived(address _from, uint _amount);
    event fundsWithdrawn(address _to, uint _amount);
    event playerFlipped(uint amountWon, uint amountCommission, uint amountSent, uint randomNonce, uint numberGenerated);

    constructor() {
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender); // set owner as admin
    }

    // needed to receive eth
    receive() external payable {
        emit fundsReceived(msg.sender, msg.value);
    }

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
    function getCommissionBasisPoints() public view onlyAdmin returns (uint) { return _commissionBasisPoints; }
    function setCommissionBasisPoints(uint commissionBasisPoints) public onlyAdmin { _commissionBasisPoints = commissionBasisPoints; }

    // returns the amount held in this contract
    function getBalance() public view onlyAdmin returns (uint) { return address(this).balance; }

    // withdraw amountWei from contract to caller address
    function withdrawFunds(uint amountWei) external onlyAdmin {
        require(amountWei <= address(this).balance, "Not enough funds in contract");
        payable(msg.sender).transfer(amountWei);
        emit fundsWithdrawn(msg.sender, amountWei);
    }

    // flip (main game) function
    function flip() public payable {
        require(msg.value > 0, "Cannot bet zero");
        require(msg.value * 2 < address(this).balance, "Contract does not have enough funds");
        require(msg.value >= _minBet, "Bet must be bigger than or equal to the minimum");
        require(msg.value <= _maxBet, "Bet must be smaller than or equal to the maximum");

        _randNonce++;
        uint number = uint(uint256(keccak256(abi.encodePacked(block.timestamp, block.difficulty, msg.sender, _randNonce)))%99);
        
        if (number <= _playerWinPercentage - 1) {
            // the minus one is to account for the numbers ranging from 0 to 99
            // if this condition is true, then player has one (payout)

            uint winnings = msg.value * 2; 

            // compute commission from basis points
            uint commission = (winnings * _commissionBasisPoints) / 10000;
            uint amountToSend = winnings - commission;

            payable(msg.sender).transfer(amountToSend);
            emit playerFlipped(winnings, commission, amountToSend, _randNonce, number);
        } else {
            emit playerFlipped(0, 0, 0, _randNonce, number);
        }

    }
}