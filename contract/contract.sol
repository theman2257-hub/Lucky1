// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract lotteryFactory is Ownable {
    event lotteryCreated(
    address indexed creator, 
    address indexed lottery,
    string name,
    string symbol,
    uint _prize,
    uint _ticketPrice,
    uint _maxTickets,
    uint _maxWinners,
    address charity
    );

   Lottery[] public lotteries;

   function createLottery(
      string name,
        string symbol,
        uint _prize,
        uint _ticketPrice,
        uint _maxTickets,
        uint _maxWinners,
        address charity,
        address _feeToken,
        address _creatorFee,
        address _charityFee

   ) {
        Lottery lottery = new Lottery(
             name,
            symbol,
            _prize,
            _ticketPrice,
            _maxTickets,
            _maxWinners,
            charity,
            _feeToken,
            _creatorFee,
            _charityFee

        );
        lotteries.push(lottery);
        emit lotteryCreated(msg.sender, 
        address(lottery),
        name,
        symbol,
        _prize,
        _ticketPrice,
        _maxTickets,
        _maxWinners,
        charity,
        _feeToken,
        _creatorFee,
        _charityFee
        );
   }
}

contract Lottery is ERC721, Ownable {
    event lotteryPurchased(address indexed buyer, uint256 tokenId);
    event PrizeWithdrawn(address indexed winner, uint256 amount);
    using Counters for Counters.Counter;
    uint public prize;
    uint public ticketPrice;
    uint public maxTickets;
    uint public maxWinners;
    uint public lastTicket;
    uint public totalFunds;
    address public charity;
    address public admin;

    //new
    address public feeToken;
    address public creatorFee;
    address public charityFee;


    address public usdt;

    address[] public winners;
    mapping(address => bool) isWinner;
    mapping(address => bool) isWithdrawn;
    mapping(address => uint) myTickets;
    mapping(address => uint[]) myTicketsIds;

    Counters.Counter private _tokenIdCounter;

    constructor(
        string name,
        string symbol,
        uint _prize,
        uint _ticketPrice,
        uint _maxTickets,
        uint _maxWinners,
        address charity,
        address _feeToken,
        address _creatorFee,
        address _charityFee

    
    )  ERC721(name, symbol) {
        prize = _prize;
        ticketPrice = _ticketPrice;
        maxTickets = _maxTickets;
        maxWinners = _maxWinners;
        charity = _charity;
        feeToken = _feeToken;
        creatorFee = _creatorFee;
        charityFee = _charityFee;
    }


    function purchaseLottery(uint amount) external {
        require(amount > 0, "Amount must be greater than 0");
        require(amount <= maxTickets, "Max tickets exceeded");
        require(msg.value == amount * ticketPrice, "Incorrect amount sent");

        require(
            IERC20(feeToken).transferFrom(msg.sender, address(this), amount * ticketPrice),
            "Failed to transfer Fee Tokens"
        );
        totalFunds += amount * ticketPrice;
        for (uint i = 0; i < amount; i++) {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(msg.sender, tokenId);
        myTickets[msg.sender] += 1;
        myTicketsIds[msg.sender].push(tokenId);
        lastTicket = tokenId;
        emit lotteryPurchased(msg.sender, tokenId);
        }
    }

    function setWinners (uint[] memory tokenIds) external  {
        //restrict to our backend server
        for (uint i = 0; i < maxWinners; i++) {
            address winner = ownerOf(tokenIds[i]);
            winners.push(winner);
            isWinner[winner] = true;
        }
    }

    function withdrawPrize () external {
        require(winners.length > 0, "Winners not set yet");
        require(isWithdrawn[msg.sender] == false, "Prize already withdrawn");
        require(isWinner[msg.sender], "You are not a winner");

        //calculate creator fee against total funds
        uint c_fee = (totalFunds * creatorFee) / 100;
        //calculate charity fee against total funds
        uint ch_fee = (totalFunds * charityFee) / 100;
        //calculate platform fee against total funds
        uint p_fee = (totalFunds * platformFee) / 100;

        prize = prize - c_fee - ch_fee - p_fee;
        myWin = prize / winners.length;
        isWithdrawn[msg.sender] = true;
        require(
            IERC20(feeToken).transfer(msg.sender, myWin),
            "Failed to transfer USDT"
        );
        emit PrizeWithdrawn(msg.sender, myWin);
    }

    function withdrawCharity () external {
        require(winners.length > 0, "Winners not set yet");
        require(msg.sender == charity, "Only charity can withdraw");
        uint charityWin = (totalFunds * charityFee) / 100;
        require(
            IERC20(feeToken).transfer(msg.sender, charityWin),
            "Failed to transfer USDT"
        );
    }

}