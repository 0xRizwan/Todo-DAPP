const hre = require("hardhat");

async function main() {
  const Todo = await hre.ethers.getContractFactory("Todo");
  const deployedTodoContract = await Todo.deploy();

  await deployedTodoContract.deployed();

  console.log( `Todo contract address: ${deployedTodoContract.address}` );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
