import React, { useState, useEffect } from 'react';
import { PublicKey, Keypair, SystemProgram } from '@solana/web3.js';
import * as anchor from '@coral-xyz/anchor';
import { Program, AnchorProvider } from '@coral-xyz/anchor';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { useWallet } from '@solana/wallet-adapter-react';
import { IDL } from '../../anchor/idl';
import { Buffer } from 'buffer';

import {
    WalletModalProvider,
    WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import "@solana/wallet-adapter-react-ui/styles.css";

import escrowKeypairData from './solana-keypair.json'; // Import the keypair data

window.Buffer = window.Buffer || Buffer;

const ScoreBettingGame = () => {
  const { publicKey, signTransaction } = useWallet();
  const [playerScore, setPlayerScore] = useState('');
  const [targetScore, setTargetScore] = useState(100);
  const [status, setStatus] = useState('');
  const [escrowAccount, setEscrowAccount] = useState(null);

  const network = WalletAdapterNetwork.Devnet;
  const connection = new anchor.web3.Connection(anchor.web3.clusterApiUrl(network), 'confirmed');
  const provider = new AnchorProvider(connection, { publicKey, signTransaction }, { preflightCommitment: 'processed' });
  anchor.setProvider(provider);

  const programId = new PublicKey('Hh7LpaGrzLMMk9NgpFkw99wHE94rQKtfCymxvBm89mgr');
  const program = new Program(IDL, programId, provider);

  useEffect(() => {
    // Create a Keypair from the imported keypair data
    const escrowKeypair = Keypair.fromSecretKey(Uint8Array.from(escrowKeypairData.secretKey));
    setEscrowAccount(escrowKeypair);
  }, []);

  const depositFunds = async () => {
    if (!publicKey || !escrowAccount) {
      console.error('Player wallet or escrow account not loaded.');
      return;
    }

    try {
      await program.methods.depositFunds(new anchor.BN(0.5 * anchor.web3.LAMPORTS_PER_SOL))
        .accounts({
          player: publicKey,
          escrowAccount: escrowAccount.publicKey,
          systemProgram: SystemProgram.programId,
        })
        .signers([]) // Only the escrow account signs the transaction
        .rpc();

      setStatus('Funds deposited into escrow');
    } catch (error) {
      console.error('Error depositing funds:', error);
    }
  };

  const submitScore = async () => {
    if (!publicKey || !escrowAccount || playerScore === '') {
      console.error('Player wallet, escrow account, or score not set.');
      return;
    }

    try {
      await program.methods.submitScore(new anchor.BN(playerScore), new anchor.BN(targetScore))
        .accounts({
          player: publicKey,
          escrowAccount: escrowAccount.publicKey,
        })
        .signers([escrowAccount])
        .rpc();

      setStatus(`Score submitted: ${playerScore}`);
    } catch (error) {
      console.error('Error submitting score:', error);
    }
  };

  return (
    <div>
      <h1>Score Betting Game</h1>
      <WalletModalProvider>
        <WalletMultiButton />
      </WalletModalProvider>
      <input
        type="number"
        placeholder="Enter your score"
        value={playerScore}
        onChange={(e) => setPlayerScore(e.target.value)}
      />
      <button onClick={depositFunds}>Deposit Funds</button>
      <button onClick={submitScore}>Submit Score</button>
      <p>Status: {status}</p>
    </div>
  );
};

export default ScoreBettingGame;