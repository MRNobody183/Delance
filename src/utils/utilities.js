import { useContext } from "react";
import { AccountContext } from "../context/accountContext";
import abi from "../abi/abi.json";
import Web3 from "web3";

export const useWallet = () => {
  const adminPrivateKey =
    "6e3303ecd362e2543e19337befddb76ecc20eacba5e61960d315789058cbf52d";
  const contract = "0x3f13aeBaa2080bB0416D1CB8bc8552dE975976D1";
  const { setAccount, account } = useContext(AccountContext);
  const address = account;
  const connectWallet = async () => {
    window.web3 = await new Web3(window.ethereum);
    await window.eth_requestAccounts;
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    console.log(accounts);
    setAccount(accounts[0]);
  };

  async function getContract() {
    window.web3 = new Web3(window.ethereum);
    await window.eth_requestAccounts;
    const web3 = window.web3;
    return new web3.eth.Contract(abi.abi, contract);
  }

  async function checkSignature(ownerAddress, freelancerAddress) {
    window.web3 = await new Web3(window.ethereum);
    await window.eth_requestAccounts;
    const web3 = window.web3;

    const hash = await web3.utils
      .soliditySha3(ownerAddress, freelancerAddress)
      .toString();

    const signatureHash = await web3.eth.accounts
      .privateKeyToAccount(adminPrivateKey)
      .sign(hash);

    const marketplace = await getContract();
    const response = await marketplace.methods
      .getSignature(signatureHash.signature)
      .call();
    console.log("signature Recovered:", response);
  }

  const postJobs = async (name, title, description, deadline, price) => {
    const marketplace = await getContract();
    await marketplace.methods
      .addJob(name, title, description, parseInt(deadline), parseInt(price))
      .send({ from: address });
    console.log("Job Inserted");
  };

  const allJobs = async () => {
    const marketplace = await getContract();
    const data = await marketplace.methods.getAllJobs().call();
    console.log(data);
    return data;
  };

  const applyForJob = async (name, email, index) => {
    const marketplace = await getContract();
    await marketplace.methods.applicantData(name, email);
    await marketplace.methods.applyForJob(parseInt(index));
  };

  return {
    connectWallet,
    postJobs,
    allJobs,
    applyForJob,
    checkSignature,
  };
};
