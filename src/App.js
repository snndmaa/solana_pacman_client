import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import axios from "axios";
import "./App.css";
import Main from "./components/main/main";
import Signup from "./components/signup/signup";
import Footer from "./components/footer/footer";
import Login from "./components/login/login";
import Test from "./components/test/test";
import { Buffer } from 'buffer';
import {PROD_URL} from './utils/env';

import { clusterApiUrl } from "@solana/web3.js";
import {
  ConnectionProvider,
} from "@solana/wallet-adapter-react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  WalletProvider,
} from "@solana/wallet-adapter-react";


window.Buffer = Buffer;

const sessionsUrl = process.env.REACT_APP_URL
  ? `${process.env.REACT_APP_URL}/sessions`
  : `${PROD_URL}/sessions`;

export default function App() {
  const [user, setUser] = useState();

  useEffect(() => {
    axios
      .get(sessionsUrl, {
        withCredentials: true,
      })
      .then((res) => {
        setUser(res.data.user);
      });
  }, []);

    const network = WalletAdapterNetwork.Devnet;
    // You can also provide a custom RPC endpoint.
    const endpoint = React.useMemo(() => clusterApiUrl(network), [network]);

    return (
      <ConnectionProvider endpoint={endpoint}>
        <WalletProvider wallets={React.useMemo(()=>[], [])} autoConnect>
          <div className="App">
            <div id="subRoot">
              <Routes>
                <Route path="/" element={<Main user={user} />}></Route>
                <Route
                  path="/signup"
                  element={user ? <Navigate to="/" /> : <Signup />}
                ></Route>
                <Route
                  path="/login"
                  element={user ? <Navigate to="/" /> : <Login />}
                ></Route>
                <Route
                  path="/test"
                  element={<Test />}
                ></Route>
              </Routes>
            </div>
            <Footer />
          </div>
        </WalletProvider>
      </ConnectionProvider>

  );
}
