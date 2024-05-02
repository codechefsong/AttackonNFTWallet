// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";

contract Items is ERC1155 {
    uint256 public constant Rock = 1;
    uint256 public constant Wood = 2;

    constructor() ERC1155("") {
    }

    function mintItem(address _account, uint256 _id) public {
        if (_id == 1) _mint(_account, Rock, 1, "");
        else if (_id == 2) _mint(_account, Wood, 1, "");
    }
}
