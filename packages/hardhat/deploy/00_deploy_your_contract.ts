import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { Contract } from "ethers";

/**
 * Deploys a contract named "YourContract" using the deployer account and
 * constructor arguments set to the deployer address
 *
 * @param hre HardhatRuntimeEnvironment object.
 */
const deployYourContract: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  /*
    On localhost, the deployer account is the one that comes with Hardhat, which is already funded.

    When deploying to live networks (e.g `yarn deploy --network sepolia`), the deployer account
    should have sufficient balance to pay for the gas fees for contract creation.

    You can generate a random account with `yarn generate` which will fill DEPLOYER_PRIVATE_KEY
    with a random private key in the .env file (then used on hardhat.config.ts)
    You can run the `yarn account` command to check your balance in every network.
  */
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  await deploy("BattleWalletNFT", {
    from: deployer,
    log: true,
    autoMine: true,
  });

  const BattleWalletNFT = await hre.ethers.getContract<Contract>("BattleWalletNFT", deployer);

  await deploy("AttackPoint", {
    from: deployer,
    log: true,
    autoMine: true,
  });

  const AttackPoint = await hre.ethers.getContract<Contract>("AttackPoint", deployer);

  await deploy("ERC6551Registry", {
    from: deployer,
    log: true,
    autoMine: true,
  });

  await deploy("ERC6551Account", {
    from: deployer,
    log: true,
    autoMine: true,
  });

  const ERC6551Registry = await hre.ethers.getContract<Contract>("ERC6551Registry", deployer);

  await deploy("Items", {
    from: deployer,
    log: true,
    autoMine: true,
  });

  const Items = await hre.ethers.getContract<Contract>("Items", deployer);

  await deploy("NFTWallets", {
    from: deployer,
    args: [
      deployer,
      await ERC6551Registry.getAddress(),
      await BattleWalletNFT.getAddress(),
      await AttackPoint.getAddress(),
      await Items.getAddress(),
    ],
    log: true,
    // autoMine: can be passed to the deploy function to make the deployment process faster on local networks by
    // automatically mining the contract deployment transaction. There is no effect on live networks.
    autoMine: true,
  });

  // Get the deployed contract to interact with it after deploying.
  // const ERC6551Account = await hre.ethers.getContract<Contract>("ERC6551Account", deployer);
  // const NFTWalletsContract = await hre.ethers.getContract<Contract>("NFTWallets", deployer);
  // console.log("Created NFT Wallet", await NFTWalletsContract.mintAndCreateTokenBoundAccount(await ERC6551Account.getAddress(), BigInt("1"), BigInt("0"), "0x", ""));
  // console.log("Set NFT Wallet to battle", await NFTWalletsContract.createBattle(BigInt("0")));
};

export default deployYourContract;

// Tags are useful if you have multiple deploy files and only want to run one of them.
// e.g. yarn deploy --tags YourContract
deployYourContract.tags = ["NFTWallets"];
