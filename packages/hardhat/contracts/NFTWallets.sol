//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/utils/Counters.sol";
import "./ERC6551Registry.sol";
import "./BattleWalletNFT.sol";

contract NFTWallets {
  using Counters for Counters.Counter;
  Counters.Counter public numberOfBattles;

  address public immutable owner;
  ERC6551Registry public registry;
  BattleWalletNFT public battleWalletNFT;

  mapping(address => address) public tbaList;
  Battle[] public battleList;

  struct Battle {
    uint256 id;
    uint256 totalDamage;
    uint256 hp;
    bool isFinish;
  }

  constructor(address _owner, address _registryAddress, address _nftAddress) {
    owner = _owner;
    registry = ERC6551Registry(_registryAddress);
    battleWalletNFT = BattleWalletNFT(_nftAddress);
  }

  modifier isOwner() {
    require(msg.sender == owner, "Not the Owner");
    _;
  }

  function getBattles() public view returns (Battle[] memory){
    return battleList;
  }

  function createBattle(uint256 _id) external {
    battleWalletNFT.setBattleWalletToDeployed(msg.sender, _id);
    uint256 newId = numberOfBattles.current();
    battleList.push(Battle(newId, 0, 100, false));
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
  }

  function withdraw() public isOwner {
    (bool success, ) = owner.call{ value: address(this).balance }("");
    require(success, "Failed to send Ether");
  }

  receive() external payable {}
}
