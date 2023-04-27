import { userState } from "react";
import { ethers } from "ethers";
import { Web3Provider } from "@ethersproject/providers";

function App() {
  const signIn = async () => {
    console.log("somethign");

    const provider = new Web3Provider(window.ethereum);

    const signer = provider.getSigner();
    const addres = signer.getAddress();
    const string = "Hello Mohan G";
    const signature = await signer.signMessage(string);
    console.log({ signature });

    const recover_address = ethers.verifyMessage(string, signature);
    console.log("recover address is", recover_address);
  };
  return (
    <div className="App">
      <header className="App-header">
        <button style={{ textAlign: "center" }} onClick={signIn}>
          <h1>sing in</h1>
        </button>
      </header>
    </div>
  );
}

export default App;
