import { Connection, PublicKey, clusterApiUrl, Keypair, Transaction, SystemProgram, sendAndConfirmTransaction } from '@solana/web3.js';
import bs58 from 'bs58';
import { Buffer } from 'buffer';

window.Buffer = Buffer;


// Connect to the Solana Devnet
const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');

// Function to send SOL when a high score is beaten
export const sendSolToWinner = async (variables) => {
  try {
    let walletKey;
    // If the current score is greater than the highest score, perform the Solana action
    if (true) {
      // Check if wallet is connected
      if (!variables.connectedWallet) {
        // Prompt the user to connect their wallet
        if (window.solana) {
          const response = await window.solana.connect();
          console.log("Wallet connected:", response.publicKey.toString());
          alert("Wallet connected:", response.publicKey.toString())
          walletKey = response.publicKey.toString();
        } else {
          alert("Solana wallet not found. Please install a wallet like Phantom.")
          throw new Error("Solana wallet not found. Please install a wallet like Phantom.");
        }
      }

      // Retrieve the recipient wallet address from variables
      const recipientAddress = walletKey;
      const recipientPublicKey = new PublicKey(recipientAddress);

      const senderKeypair = Keypair.fromSecretKey(Uint8Array.from([126,77,204,105,238,133,225,207,165,107,76,136,56,136,156,10,140,98,154,208,27,58,62,25,4,91,64,45,86,38,138,165,212,148,200,3,222,155,62,16,172,129,221,159,56,172,184,51,164,123,6,108,244,110,248,228,125,166,48,94,63,211,48,185]));

      // Create the transaction to send SOL
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: senderKeypair.publicKey,
          toPubkey: recipientPublicKey,
          lamports: 1000000,  // Amount to send in lamports (1 SOL = 1,000,000,000 lamports)
        })
      );

      // Send the transaction and confirm
      const signature = await sendAndConfirmTransaction(
        connection,
        transaction,
        [senderKeypair]  // The keypair that signs the transaction
      );

      alert('You won some Sol! Check your wallet.')
      console.log("Transaction successful! Signature:", signature);

    } else {
      console.log("Score is not high enough to trigger a Solana transaction.");
    }

  } catch (error) {
    console.error("Error sending SOL:", error);
  }
};
