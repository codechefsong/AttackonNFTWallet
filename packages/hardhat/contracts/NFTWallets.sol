//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/utils/Counters.sol";
import "./ERC6551Registry.sol";
import "./BattleWalletNFT.sol";
import "./AttackPoint.sol";

contract NFTWallets {
  using Counters for Counters.Counter;
  Counters.Counter public numberOfBattles;

  ERC6551Registry public registry;
  BattleWalletNFT public battleWalletNFT;
  AttackPoint public attackPoint;

  address public immutable owner;
  uint256 public constant tokensPerEth = 100000;
  mapping(address => address) public tbaList;
  Battle[] public battleList;

  struct Battle {
    uint256 id;
    uint256 totalDamage;
    uint256 hp;
    uint256 prizePool;
    bool isFinish;
  }

  constructor(address _owner, address _registryAddress, address _nftAddress, address _tokenAddress) {
    owner = _owner;
    registry = ERC6551Registry(_registryAddress);
    battleWalletNFT = BattleWalletNFT(_nftAddress);
    attackPoint = AttackPoint(_tokenAddress);
  }

  event BuyTokens(address buyer, uint256 amountOfETH, uint256 amountOfTokens);

  modifier isOwner() {
    require(msg.sender == owner, "Not the Owner");
    _;
  }

  function getBattles() public view returns (Battle[] memory){
    return battleList;
  }

  function getBattleByID(uint256 _battleId) public view returns (Battle memory){
    return battleList[_battleId];
  }

  function createBattle(uint256 _id) external {
    battleWalletNFT.setBattleWalletToDeployed(msg.sender, _id);
    uint256 newId = numberOfBattles.current();
    battleList.push(Battle(newId, 0, 100, 0, false));
    numberOfBattles.increment();
  }

  function mintAndCreateTokenBoundAccount(
    address _implementation,
    uint256 _chainId,
    uint256 _salt,
    bytes calldata _initData,
    string calldata _tokenURI
  ) external {
    uint256 tokenId = battleWalletNFT.mint(msg.sender, _tokenURI);
    address newTBA = registry.createAccount(_implementation, _chainId, address(battleWalletNFT), tokenId, _salt, _initData);
    tbaList[msg.sender] = newTBA;
    battleWalletNFT.setTBA(msg.sender, tokenId, newTBA);
  }

  function depositETH(uint256 _id, address _tba) public payable {
    battleList[_id].prizePool += msg.value;
    (bool success, ) = _tba.call{ value: msg.value }("");
    require(success, "Failed to send Ether");
  }

  function buyAttackPoint() public payable {
    uint256 tokens = tokensPerEth * msg.value;
    attackPoint.mint(msg.sender, tokens);
    emit BuyTokens(msg.sender, msg.value, tokens);
  }

  function attackWallet(uint256 _id) public {
    if (battleList[_id].hp > 10) {
      battleList[_id].hp -= 10;
    }
    else {
      battleList[_id].hp = 0;
      battleList[_id].isFinish = true;
    }
    battleList[_id].totalDamage += 10;
  }

  function healWallet(uint256 _id) public {
    battleList[_id].hp = 100;
  }

  function withdraw() public isOwner {
    (bool success, ) = owner.call{ value: address(this).balance }("");
    require(success, "Failed to send Ether");
  }

  receive() external payable {}
}
