import logo from './ethereum-1.svg';
import React from 'react';
import './App.css';
import {contractID,contractABI} from './variabile.js';
const { ethers, BigNumber } = require("ethers");

function App() {

  const [numberOfPlayers,setNumberOfPlayers] = React.useState(0);
  const [boolx, setboolx] = React.useState(false);
  
  async function connect(){
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const numberContract = new ethers.Contract(contractID,contractABI,provider); 
    await provider.send("eth_requestAccounts", []);
    console.log("conectat");
    const nrOfPlayers = await numberContract.getNumber();
    console.log(BigNumber.from(nrOfPlayers).toString());
    setNumberOfPlayers(BigNumber.from(nrOfPlayers).toString());
    const boolx1 = await numberContract.getStarted();
    console.log(boolx1);
    setboolx(boolx1);
  }


  async function join(){

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const numberContract = new ethers.Contract(contractID,contractABI,signer);
    const options = {value: ethers.utils.parseEther("0.1")}
    const numeeeee = await numberContract.getStarted();
    console.log(numeeeee);
    await numberContract.enter(options);
    const nrOfPlayers = await numberContract.getNumber();
    console.log(BigNumber.from(nrOfPlayers).toString());
    setNumberOfPlayers(BigNumber.from(nrOfPlayers).toString());
    // await provider.send("eth_requestAccounts", []);
    // await signer.sendTransaction();
  }


  async function start(){
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const numberContract = new ethers.Contract(contractID,contractABI,signer); 
 //   await provider.send("eth_requestAccounts", []);
    await numberContract.startTombola();
  }


  async function finish(){
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const numberContract = new ethers.Contract(contractID,contractABI,signer); 
 //   await provider.send("eth_requestAccounts", []);
    
    //const numar = await numberContract.getNumber();
    //console.log(numar);
    await numberContract.finalizareTombola();
  }

  async function withdraw(){
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const numberContract = new ethers.Contract(contractID,contractABI,signer); 
    await numberContract.withdrawFunds();
  }

  return (

    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>There are currently {numberOfPlayers} players.</p>
        <div>The lottery is currently <b> {boolx ? 'STARTED' : 'STOPPED'}</b></div>
        <button type="button" id="random" onClick={connect}>Connect with metamask </button>
        <button type="button" id="random" onClick={join}>Join Lottery </button>
        <button type="button" id="random" onClick={start}>Start Lottery (admin only)</button>
        <button type="button" id="random" onClick={finish}>Pick a winner (admin only)</button>
        <button type="button" id="random" onClick={withdraw}>Withdraw funds (admin only)</button>
      </header>
    </div>
  );
}

export default App;