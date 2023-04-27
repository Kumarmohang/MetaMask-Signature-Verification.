import "./App.css";
import Web3 from "web3";
import React, { useState, useEffect } from "react";

function App() {
  const [address, setAddress] = useState("");
  const [message, setMessage] = useState("");
  const [web3, setWeb3] = useState("");
  const [signature, setSignature] = useState("");
  const [whoSignedAddress, setWhosignedAddress] = useState("");
  let acc;
  const login = async () => {
    let web;

    console.log("something");
    if (window.ethereum) {
      await window.ethereum.send("eth_requestAccounts");
      web = new Web3(window.ethereum);
      setWeb3(web);
      const accounts = await web3.eth.getAccounts();
      acc = accounts[0];
      console.log(accounts[0]);

      setAddress(acc);
      console.log("address is ", address);
    }
  };

  const SignMessage = async () => {
    let Singedaddress;
    let sig;
    if (message) {
      sig = await web3.eth.personal.sign(message, address);
      console.log({ sig });
      setSignature(sig);
      console.log("signature is ", signature);
      console.log("Message is ", message);
      Singedaddress = await web3.eth.personal.ecRecover(message, sig);
      setWhosignedAddress(Singedaddress);
      console.log("who is Signed the address is ", Singedaddress);
      console.log("after the usestate", whoSignedAddress);
    }
  };
  useEffect(() => {
    setAddress(acc);
    console.log("address in use Effect", address);
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <div>
          <button className="btn" onClick={login}>
            <h2>Login</h2>
          </button>
        </div>
        <div>
          <button onClick={SignMessage}>
            <h2>Sign A Message</h2>
          </button>
        </div>
        <br />
        <h2>
          <input
            onChange={(e) => {
              console.log(e.target.value);
              setMessage(e.target.value);
            }}
          />
        </h2>
        <label>
          Your address is<h3>{address}</h3>
        </label>
        <br />
        <label>
          Who signed the Mess is <h2>{whoSignedAddress}</h2>
        </label>
      </header>
    </div>
  );
}

export default App;
