import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import "@solana/wallet-adapter-react-ui/styles.css";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import * as walletAdapterWallets from "@solana/wallet-adapter-wallets";
import * as web3 from "@solana/web3.js";
// require("@solana/wallet-adapter-react-ui/styles.css");
import { NavBody } from "@/components/NavBar/Nav";
import "../styles/globals.css";
import { AppProps } from "next/app";

// const network = WalletAdapterNetwork.Devnet;

const App = ({ Component, pageProps }: AppProps) => {
  const endpoint = web3.clusterApiUrl("mainnet-beta");
  const wallets = [new walletAdapterWallets.PhantomWalletAdapter()];

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <NavBody />
          <Component {...pageProps} />
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};

export default App;
