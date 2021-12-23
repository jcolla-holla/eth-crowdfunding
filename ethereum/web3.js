import Web3 from "web3";
import  { inboxInfraID } from "./secrets";

let web3;

if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
  // We are in the browser and metamask is running.
  window.ethereum.request({ method: "eth_requestAccounts" });
  web3 = new Web3(window.ethereum);
} else {
  // We are on the server *OR* the user is not running metamask
  console.log("inboxInfraID", inboxInfraID);
  const provider = new Web3.providers.HttpProvider(inboxInfraID);
  web3 = new Web3(provider);
}

export default web3;