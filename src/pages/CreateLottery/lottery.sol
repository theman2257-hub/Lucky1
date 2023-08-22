// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.17;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

interface IERC20 {
    // ... (function signatures of the IERC20 interface)
}

contract lotteryFactory {
    address[] public lotteries;

    function createLottery(string memory _name, string memory _shortName, uint _lotteryPrize, uint _ticketPrice) public payable {
        address newLottery = address(new lottery(_name, _shortName, _lotteryPrize, _ticketPrice));
        lotteries.push(newLottery);
    }
}

contract lottery is ERC721, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;

    struct details {
        uint winningTicket;
        address[] winners;
        uint lotteryPrize;
        uint entrancePrice;
        bool isEnded;
        uint endTime;
        uint maxTicketsPerWallet; // New field for max tickets per wallet
    }

    details public lotteryDetails;
    mapping(uint => address) public ticketOwner;
    address public ticketCurrency;
    address public lotteryOwner;
    mapping(address => bool) public isWinner;
    mapping(address => bool) public isClaimed;
    mapping(address => uint) public NumberOfTicketsPurchased;
    event ticketsPurchased(address user, uint amount, uint total);

    modifier isLotteryOwner {
        require(msg.sender == lotteryOwner, 'caller not owner');
        _;
    }

    constructor(string memory _name, string memory _shortName, uint _lotteryPrize, uint _ticketPrice, uint _maxTicketsPerWallet) ERC721(_name, _shortName) {
        lotteryDetails.lotteryPrize = _lotteryPrize;
        lotteryDetails.entrancePrice = _ticketPrice;
        lotteryDetails.maxTicketsPerWallet = _maxTicketsPerWallet; // Initialize maxTicketsPerWallet
        lotteryDetails.endTime = 1707583733;
    }
    function _baseURI() internal view override returns (string memory) {
        return URI;
    }

    function purchaseTickets(uint _amount) public {
        require( isActive() == true, 'lottery not active');
        // IERC20(ticketCurrency).transferFrom(msg.sender, address(this), (lotteryDetails.entrancePrice * tickets.length));
        for(uint i = 0; i < _amount; i ++) {
            _safeMintto(msg.sender);
            NumberOfTicketsPurchased[msg.sender] ++;
        }
        emit ticketsPurchased(msg.sender, _amount, 20 * _amount);
    }

     function _safeMintto(address to) internal {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
    }

    function isActive() public view returns(bool _isActive) {
        if (lotteryDetails.isEnded == true) {
            return false;
        } else if (block.timestamp > lotteryDetails.endTime){
            return false;
        } else {
            return true;
        }
    }

    function _endLottery() internal {
        lotteryDetails.isEnded = true;
    }

    function setWinners(uint[] memory _winningTickets) public {
        //offchain feed
        for(uint i = 0; i < _winningTickets.length;i++){
            uint ticket = _winningTickets[i];
            address winner = ticketOwner[ticket];
            lotteryDetails.winners.push(winner);
            isWinner[winner] = true;
        }
        _endLottery();
    }

    function getWinners() public view returns(address[] memory _winners){
        return lotteryDetails.winners;
    }

    function claimLottery () public {
        require(isActive() == false);
        require(isWinner[msg.sender] == true, 'caller is not winner');
        require(isClaimed[msg.sender]== false, 'winner has claimed');
        // IERC20(ticketCurrency).transfer(address(0), lotteryDetails.lotteryPrize);
        isClaimed[msg.sender] = true;
    }


}
