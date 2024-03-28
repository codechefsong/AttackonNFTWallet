//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/utils/Counters.sol";
import "./ERC6551Registry.sol";

contract NFTWallets {
  using Counters for Counters.Counter;
  Counters.Counter public numberOfBattles;

  address public immutable owner;
  ERC6551Registry public registry;

  mapping(address => address) public tbaList;
  Battle[] public battleList;

  struct Battle {
    uint256 id;
    uint256 totalDamage;
    uint256 hp;
    bool isFinish;
  }

  constructor(address _owner, address _registryAddress) {
    owner = _owner;
    registry = ERC6551Registry(_registryAddress);
  }

  modifier isOwner() {
    require(msg.sender == owner, "Not the Owner");
    _;
  }

  function getBattles() public view returns (Battle[] memory){
    return battleList;
  }

  function createBattle() external {
    uint256 newId = numberOfBattles.current();
    battleList.push(Battle(newId, 0, 100, false));
    numberOfBattles.increment();
  }

  function createTokenBoundAccount(
    address _implementation,
    uint256 _chainId,
    address _tokenContract,
    uint256 _tokenId,
    uint256 _salt,
    bytes calldata _initData
  ) external {
    address newTBA = registry.createAccount(_implementation, _chainId, _tokenContract, _tokenId, _salt, _initData);
    tbaList[msg.sender] = newTBA;
  }

  function withdraw() public isOwner {
    (bool success, ) = owner.call{ value: address(this).balance }("");
    require(success, "Failed to send Ether");
  }

  receive() external payable {}
}
