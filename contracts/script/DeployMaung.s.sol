// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Script.sol";
import "../src/MaungToken.sol";
import "../src/TaringToken.sol";
import "../src/MaungStaking.sol";

contract DeployMaung is Script {

    function run() external {

        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);

        // ======================================================
        // 🪙 Deploy MAUNG Token
        // ======================================================
        MaungToken maung = new MaungToken();

        // ======================================================
        // 💎 Deploy TARING Token
        // ======================================================
        TaringToken taring = new TaringToken();

        // ======================================================
        // 📈 Calculate Reward Rate (20% APR)
        // ======================================================

        uint256 APR = 20;
        uint256 PRECISION = 1e18;
        uint256 SECONDS_PER_YEAR = 365 days;

        // rewardRate = (APR% per year) converted to per second
        uint256 rewardRate = (APR * PRECISION) / (100 * SECONDS_PER_YEAR);

        console.log("Reward Rate:", rewardRate);

        // ======================================================
        // 🐯 Deploy Staking Contract
        // ======================================================
        MaungStaking staking = new MaungStaking(
            address(maung),
            address(taring),
            rewardRate
        );

        // Transfer TARING ownership to staking
        taring.transferOwnership(address(staking));

        vm.stopBroadcast();

        console.log("======================================");
        console.log("MAUNG Token:", address(maung));
        console.log("TARING Token:", address(taring));
        console.log("STAKING Contract:", address(staking));
        console.log("======================================");
    }
}
