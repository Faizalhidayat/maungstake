// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "openzeppelin-contracts/contracts/token/ERC20/IERC20.sol";
import "openzeppelin-contracts/contracts/access/Ownable.sol";

interface ITaring {
    function mint(address to, uint256 amount) external;
}

contract MaungStaking is Ownable {

    IERC20 public immutable maung;
    ITaring public immutable taring;

    // reward per token per second (scaled 1e18)
    uint256 public rewardRate;

    struct StakeInfo {
        uint256 amount;
        uint256 lastUpdate;
        uint256 unclaimed;
    }

    mapping(address => StakeInfo) public stakes;

    constructor(
        address _maung,
        address _taring,
        uint256 _rewardRate
    ) Ownable(msg.sender) {
        maung = IERC20(_maung);
        taring = ITaring(_taring);
        rewardRate = _rewardRate;
    }

    // 🔥 Owner can update emission
    function setRewardRate(uint256 _rate) external onlyOwner {
        rewardRate = _rate;
    }

    function _updateReward(address user) internal {
        StakeInfo storage s = stakes[user];

        if (s.amount > 0) {
            uint256 timeElapsed = block.timestamp - s.lastUpdate;

            uint256 reward =
                (s.amount * rewardRate * timeElapsed) / 1e18;

            s.unclaimed += reward;
        }

        s.lastUpdate = block.timestamp;
    }

    function stake(uint256 amount) external {
        require(amount > 0, "Invalid amount");

        _updateReward(msg.sender);

        maung.transferFrom(msg.sender, address(this), amount);

        stakes[msg.sender].amount += amount;
    }

    function claim() external {
        _updateReward(msg.sender);

        uint256 reward = stakes[msg.sender].unclaimed;
        require(reward > 0, "No reward");

        stakes[msg.sender].unclaimed = 0;

        taring.mint(msg.sender, reward);
    }

    function withdraw(uint256 amount) external {
        StakeInfo storage s = stakes[msg.sender];
        require(s.amount >= amount, "Not enough stake");

        _updateReward(msg.sender);

        s.amount -= amount;

        maung.transfer(msg.sender, amount);
    }

    function pending(address user) external view returns (uint256) {
        StakeInfo memory s = stakes[user];

        if (s.amount == 0) return s.unclaimed;

        uint256 timeElapsed = block.timestamp - s.lastUpdate;

        uint256 reward =
            (s.amount * rewardRate * timeElapsed) / 1e18;

        return s.unclaimed + reward;
    }
}
