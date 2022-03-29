import Web3 from "web3";
var web3 = new Web3(Web3.givenProvider || "http://localhost:8546");

export const getEthAddress = async () => {
  if (window.web3) {
    web3 = new Web3(window.ethereum);

    await window.ethereum.enable();
    var accounts = await web3.eth.getAccounts();
    return accounts[0];
  }
};

export const register = async (address) =>
  await fetch("http://localhost:3001/register", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      address: address.toLowerCase(),
    }),
  }).then((json) => json.json());

export const loginWithEth = async (address) => {
  await register(address);
  var nonceFetch = await getNonce(address);
  console.log(nonceFetch.nonce);
  login(nonceFetch.nonce, await web3.eth.getCoinbase());
};

export const getNonce = async (address) =>
  await fetch("http://localhost:3001/login/getUserNonce", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ address: address }),
  }).then((json) => json.json());

export const login = async (nonce, address) => {
  console.log(nonce);
  await fetch("http://localhost:3001/login", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      nonce: nonce,
      signature: await web3.eth.personal.sign(
        "Signing nonce: " + nonce,
        address,
        console.log
      ),
      address: address,
    }),
  }).then((json) => json.json());
};
