import logo from './logo.svg';
import './App.css';

function App() {

  const { ethers } = require("ethers");
  const contractID = "0x23fd4f984715FdA04d41bAa49743FAD89e4a8088";
  const contractABI = [
    {
      "inputs": [],
      "name": "enter",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "finalizareTombola",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_nume",
          "type": "string"
        }
      ],
      "name": "setNume",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "startTombola",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [],
      "name": "withdrawFunds",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getNume",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "nume",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "players",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ];

  async function connect(){
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const numberContract = new ethers.Contract(contractID,contractABI,provider); 
    await provider.send("eth_requestAccounts", []);
    console.log("conectat");
  }


  async function join(){

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    
    const signer = provider.getSigner();
    const numberContract = new ethers.Contract(contractID,contractABI,signer);
    const options = {value: ethers.utils.parseEther("0.1")}
    //const numeeeee = await numberContract.nume();
    //console.log(numeeeee);
    await numberContract.enter(options);
    // await provider.send("eth_requestAccounts", []);
    // await signer.sendTransaction();
  }


  async function start(){
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const numberContract = new ethers.Contract(contractID,contractABI,signer); 
 //   await provider.send("eth_requestAccounts", []);
    console.log("conectat");
    await numberContract.startTombola();
  }


  async function finish(){
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const numberContract = new ethers.Contract(contractID,contractABI,signer); 
 //   await provider.send("eth_requestAccounts", []);
    console.log("conectat");
    await numberContract.finalizareTombola();
  }


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <button type="button" id="random" onClick={connect}>Connect with metamask </button>
        <button type="button" id="random" onClick={join}>Join Lottery </button>
        <button type="button" id="random" onClick={start}>Start Lottery (admin only)</button>
        <button type="button" id="random" onClick={finish}>Pick a winner (admin only)</button>
      </header>
    </div>
  );
}

export default App;