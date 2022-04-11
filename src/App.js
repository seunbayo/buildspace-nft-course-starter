import './styles/App.css';
import twitterLogo from './assets/twitter-logo.svg';
import React from "react";

// Constants
const TWITTER_HANDLE = '_seunbayoNg';
const TWITTER_LINK = `https://twitter.com/${seunbayoNg}`;
const OPENSEA_LINK = '';
const TOTAL_MINT_COUNT = 50;

const App = () => {
  // Render Methods
  const renderNotConnectedContainer = () => (
    <button className="cta-button connect-wallet-button">
      Connect to Wallet
    </button>
  );

  return (
    <div className="App">
      <div className="container">
        <div className="header-container">
          <p className="header gradient-text">My NFT Collection</p>
          <p className="sub-text">
            Each unique. Each beautiful. Discover your NFT today.
          </p>
          {renderNotConnectedContainer()}
        </div>
        <div className="footer-container">
          <img alt="Twitter Logo" className="twitter-logo" src={twitterLogo} />
          <a
            className="footer-text"
            href={https://twitter.com/seunbayong}
            target="_blank"
            rel="noreferrer"
          >{`built on @${seunbayoNg}`}</a>
        </div>
      </div>
    </div>
  );
};

export default App;
