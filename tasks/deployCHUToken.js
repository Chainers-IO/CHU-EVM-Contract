const config = require("config");

task("deployCHUToken", "Deploys contract CHUToken.sol to the specified network").setAction(async () => {
    const contractsConfig = config.get("contractsConfig");
	const { contractName } = contractsConfig;
    const { decimals } = contractsConfig;

	// eslint-disable-next-line no-undef
	const CHU = await ethers.getContractFactory(contractName);
	const chu = await CHU.deploy(decimals, {gasLimit: 10000000});

	await chu.deployed();
    
	const contractAddress = chu.address;
	const transactionInfo = chu.deployTransaction;

	const transactionHash = transactionInfo.hash;
	const { blockNumber } = transactionInfo;
	const { gasPrice } = transactionInfo;
	const { gasLimit } = transactionInfo;
	const networkChainId = transactionInfo.chainId;

	const line = "\n--------------------------------------------\n";

	console.log(
		`
      \nContract CHU is now deployed
      ${line}\nContract address: ${contractAddress}
      ${line}\nNetwork chainId: ${networkChainId}
      ${line}\nTransaction hash: ${transactionHash}
      ${line}\nBlock number: ${blockNumber}
      ${line}\nGas price: ${gasPrice}
      ${line}\nGas limit: ${gasLimit}
      ${line}
      `
	);
});
