const { Keypair } = require('@solana/web3.js');
const fs = require('fs');
const path = require('path');

// Generate a new keypair
const keypair = Keypair.generate();

// Define the output file path (same folder as the script)
const outputFilePath = path.join(__dirname, 'solana-keypair.json');

// Prepare the data to be saved
const keypairData = {
    publicKey: keypair.publicKey.toBase58(),
    secretKey: Array.from(keypair.secretKey) // Convert Uint8Array to normal array
};

// Write the keypair data to the file
fs.writeFileSync(outputFilePath, JSON.stringify(keypairData, null, 2), 'utf-8');

console.log(`Keypair saved to ${outputFilePath}`);
