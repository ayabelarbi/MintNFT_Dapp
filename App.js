import './styles/App.css';
import twitterLogo from './assets/twitter-logo.svg';
import React, { useEffect, useState } from "react";

// Constants
const TWITTER_HANDLE = '_buildspace';
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;
const OPENSEA_LINK = '';
const TOTAL_MINT_COUNT = 50;

const App = () => {

  //State variable to store our user's public adresse
  const [ currentAccount, setCurrentAccount] = useState("");
  const checkIfWalletIsConnected = async() => {
    //first make sur we have access to window.ethereum

  const { ethereum } = window;

  if (!ethereum){
      console.log("Make sur you have metamask !"); 
      return;
  } else {
      console.log("We have the ethereum object", ethereum); 
  }

  const accounts = await ethereum.request({ method: 'eth_accounts' });

  if (accounts.length !== 0){
    const account = accounts[0]; 
    console.log("Found an authorized account:", account); 
    setCurrentAccount(account); 
  } else{ 
    console.log("No authorized account found");
  }
}
//on connect le wallet au website
const connectWellet = async () => {
  try{
    const { ethereum } = window; 

    if (!ethereum) {
      alert("Get MetaMask !"); 
      return; 
    }
    const accounts = await ethereum.request({ method: "eth_requestAccounts"}); 

    console.log("Connected", accounts[0]); 
    setCurrentAccount(accounts[0]); 
  } catch (error) {
    console.log(error); 
  }
}
  // Render Methods
  const renderNotConnectedContainer = () => (
    <button className="cta-button connect-wallet-button">
      Connect to Wallet
    </button>
  );

  useEffect( () => {
    checkIfWalletIsConnected(); 
  }, [] );

  return (
    <div className="App">
      <div className="container">
        <div className="header-container">
          <p className="header gradient-text">Cham's NFT Collection</p>
          <p className="sub-text">
            Each unique. Each beautiful. Discover your NFT today.
          </p>
          {renderNotConnectedContainer()}
        </div>
        <div className="footer-container">
          <img alt="Twitter Logo" className="twitter-logo" src={twitterLogo} />
          <a
            className="footer-text"
            href={TWITTER_LINK}
            target="_blank"
            rel="noreferrer"
          >{`built on @${TWITTER_HANDLE}`}</a>
        </div>
      </div>
    </div>
  );
};

export default App;
