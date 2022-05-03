import './styles/App.css';
import twitterLogo from './assets/twitter-logo.svg';
import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import seunNFT from './utils/seunNFT.json'

// Constants
const TWITTER_HANDLE = 'SeunbayoNg';
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;
const OPENSEA_LINK = '';
const TOTAL_MINT_COUNT = 50;

const App = () => {
/* Just a state variable we use to store our user''s public wallet. Dont forget to import useState */

  const [currentAccount, setCurrentAccount] = useState("");
/* To make sure its async */

  const checkIfWalletIsConnected = async () => {
    // first make sure we have access to window.ethereum
    const { ethereum } = window;

    if (!ethereum) {
      console.log("Make sure you have metamask!");
      return;
    } else {
      console.log("We have the ethereum object", ethereum);
    }

    /* check if we are authorized to access the users wallet */
    const accounts = await ethereum.request({ method: 'eth_accounts' });

  /* User can have multiple authorized accounts, we grab the first one if its there! */

    if (accounts.length !== 0) {
      const account = accounts[0];
      console.log("Found an authorized account:", account);
      setCurrentAccount(account);
    } else {
      console.log("No authorized account found");
    }
  }

  // Implementing currentWallet Method here
  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }
      // Fancy method to request access to account.
      const accounts = await ethereum.request({ method: "eth_requestAccounts" });
      /*
      * Boom! This should print out public address once we authorize Metamask.
      */
      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);
    }

    const askContractToMintNft = async () => {
      const CONTRACT_ADDRESS = "0x640333C9ACBe1723ef53baa273627A9bb410eF9b";

      try {
        const { ethereum } = window;

        if (ethereum) {
          const provider = new ethers.providers.Web3Provider(ethereum);
          const signer = provider.getSigner();
          const connectedContract = new ethers.Contract(CONTRACT_ADDRESS, seunNFT.abi, signer);

          console.log("Going to pop wallet now to pay gas...")
          let nftTXn = await connectedContract.makeAnEpicNFT();

          console.log("Mining...please wait.")
          await nftTXn.wait();
          console.log('nftTXn');
          

          console.log(`Mined, see transaction: https://rinkeby.etherscan.io/tx/${nftTXn.hash}`);

        } else {
          console.log("Ethereum object doesn't exist!");
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

  // Render Methods
// return (
//   { currentAccount === ""
//     ? renderNotConnectedContainer()
//     : (
//       // / Add askContractToMintNft Action for the onClick event
//       < button onClick = { askContractToMintNft } className = "cta-button connect-wallet-button" >
//         Mint NFT
//       </button >
//     )
//   }
// );


  // This runs our function when the page loads
  useEffect(() => {
    checkIfWalletIsConnected();
  }, [])

  /*
  * Added a conditional render! We don't want to show Connect to Wallet if we're already connected :).
  */


  return (
    <div className="App">
      <div className="container">
        <div className="header-container">
          <p className="header gradient-text">My NFT Collection</p>
          <p className="sub-text">
            Each unique. Each beautiful. Discover your NFT today.
          </p>
          {currentAccount === "" ? (
            renderNotConnectedContainer()
          ) : (
              {/* <button onClick={null} className="cta-button connect-wallet-button">
                Mint NFT
              </button> */}
              < button onClick={askContractToMintNft} className="cta-button connect-wallet-button" >   Mint NFT
              </button >
            )}
        </div>
        <div className="footer-container">
          <img alt="Twitter Logo" className="twitter-logo" src={twitterLogo} />
          <a
            className="footer-text"
            href={TWITTER_LINK}
            target="_blank"
            rel="noreferrer"
          >{`built by @${TWITTER_HANDLE}`}</a>
        </div>
      </div>
    </div>
  );

};

export default App;
