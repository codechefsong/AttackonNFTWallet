//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract AttackPoint is ERC20 {
    constructor() ERC20("Attack Point", "ATK") {}

    function mint(address account, uint256 amount) public {
        _mint(account, amount);
    }

    function burn(address account, uint256 amount) public {
        _burn(account, amount);
    }

    function payTokenAndSent(address to, uint256 amount) public {
        _burn(msg.sender, amount);
        _mint(to, amount / 5);
    }
}
