// Initialize node-config
const config = require("config");

// Importing required modules
require("dotenv").config();
require("@nomiclabs/hardhat-waffle");
require("@typechain/hardhat");

// Ledger plugin
require("@nomicfoundation/hardhat-ledger");
require("@nomicfoundation/hardhat-verify");

require("./tasks/deployCHUToken");

// Getting hardhatConfig object from on config file
const hardhatConfig = config.get("hardhatConfig");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
	solidity: {
		compilers: [
			{
				version: hardhatConfig.solidity.solidityVersion,
				settings: {
					optimizer: {
						enabled: hardhatConfig.solidity.optimizerEnabled,
						runs: hardhatConfig.solidity.optimizerRuns,
					},
				},
			},
		],
	},

	networks: {
		polygon: {
			url: hardhatConfig.networks.polygon.url,
			chainId: hardhatConfig.networks.polygon.chainId,
			ledgerAccounts: [hardhatConfig.networks.polygon.ledgerAccount],
		},

		hardhat: {
			forking: {
				url: hardhatConfig.networks.polygon.url,
				enabled: false,
			},
		},
	},

	etherscan: config.util.toObject(hardhatConfig.etherscan),

	mocha: {
		timeout: 100000000,
	},
};
