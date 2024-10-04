import { Connection, clusterApiUrl } from '@solana/web3.js';

export const connection = new Connection(clusterApiUrl('devnet'), 'confirmed'); // Or 'mainnet-beta'

export const connectWallet = async (setWalletConnect) => {
    const { solana } = window;
    if (solana && solana.isPhantom) {
        try {
            const response = await solana.connect();
            setWalletConnect(true)
            alert('Connected with Public Key:', response.publicKey.toString());
            return response.publicKey;
        } catch (err) {
            console.error('Wallet connection failed', err);
        }
    }
};
