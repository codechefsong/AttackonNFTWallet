// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract BattleWalletNFT is ERC721URIStorage {
  using Counters for Counters.Counter;
  Counters.Counter private _tokenIds;

  mapping(address => BattleWallet[]) public userBattleWallet;

  struct BattleWallet {
    uint256 id;
    string url;
    address tba;
    bool isDeployed;
  }

  constructor() ERC721("Battle Wallet", "BW") {}

  function mint(address _to, string memory _tokenURI) public returns (uint256) {
    uint256 newItemId = _tokenIds.current();
    _mint(_to, newItemId);
    _setTokenURI(newItemId, _tokenURI);

    _tokenIds.increment();
    userBattleWallet[_to].push(BattleWallet(newItemId, _tokenURI, address(0), false));
    return newItemId;
  }

  function getMyNFTs(address _owner) public view returns (BattleWallet[] memory){
    return userBattleWallet[_owner];
  }

  function getNonDeployedBattleWallet(address _owner) public view returns (BattleWallet[] memory){
    uint battleWalletCount = 0;
    uint battleWalletId = 0;
   
    for (uint i = 0; i < userBattleWallet[_owner].length; i++) {
      if (userBattleWallet[_owner][i].isDeployed == false) {
        battleWalletCount += 1;
      }
    }

    BattleWallet[] memory nonDeployBattleWallets = new BattleWallet[](battleWalletCount);

    for (uint i = 0; i < userBattleWallet[_owner].length; i++) {
      if (userBattleWallet[_owner][i].isDeployed == false) {
        BattleWallet memory newBattleWallet = userBattleWallet[_owner][i];
        nonDeployBattleWallets[battleWalletId] = newBattleWallet;
        battleWalletId++;
      }
    }

    return nonDeployBattleWallets;
  }

  function setBattleWalletToDeployed(address _owner, uint256 _id) public {
    userBattleWallet[_owner][_id].isDeployed = true;
  }

  function setTBA(address _owner, uint256 _id, address _tba) public {
    userBattleWallet[_owner][_id].tba = _tba;
  }
}