import dotenv from 'dotenv';

import { ContractInfo } from "../modules/shared/contract/types";
import { getSecretNetworkClient } from "../modules/shared/utils/config";
import { Snip20Deployment } from './contracts/Snip20Deployment';
import { Snip721Deployment } from './contracts/Snip721Deployment';


dotenv.config();



// Main function
async function main() {
	const secretjs = getSecretNetworkClient();

	const snip20Deployment = new Snip20Deployment(secretjs)
	const snip20 = snip20Deployment.getCurrentDeployment()
	logContractInfo(snip20.getContractInfo(), "Snip20 Contract Info")

	const snip721Deployment = new Snip721Deployment(secretjs)
	const snip721 = snip721Deployment.getCurrentDeployment()
	logContractInfo(snip721.getContractInfo(), "Snip721 Contract Info")

}

function logContractInfo(contractInfo: ContractInfo, title = "Contract Info") {
	// Selecting a random color
	const randomColor = colors[Math.floor(Math.random() * colors.length)];

	// Creating a long line
	const line = '='.repeat(85);

	// Logging the contract info with color
	console.log(randomColor, line);
	console.log(`${title}:`);
	console.log(JSON.stringify(contractInfo, null, 2));
	console.log(randomColor, line, '\x1b[0m'); // Reset to default color after line
}

const colors = [
	'\x1b[31m', // Red
	'\x1b[32m', // Green
	'\x1b[33m', // Yellow
	'\x1b[34m', // Blue
	'\x1b[35m', // Magenta
	'\x1b[36m', // Cyan
	'\x1b[37m', // White
	'\x1b[91m', // Bright Red
	'\x1b[92m', // Bright Green
	'\x1b[93m', // Bright Yellow
	'\x1b[94m', // Bright Blue
	'\x1b[95m', // Bright Magenta
	'\x1b[96m', // Bright Cyan
	'\x1b[97m', // Bright White
	'\x1b[90m', // Bright Black (Grey)
];

// Check if the script is being run directly
if (require.main === module) {
	main();
}