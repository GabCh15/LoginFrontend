import Web3 from "web3";
var web3 = new Web3(Web3.givenProvider || "http://localhost:8546");

export const getEthAddress = async () => {
  if (window.web3) {
    web3 = new Web3(window.ethereum);

    
    return (await window.ethereum.enable()).toString();
  }
};

export const registerWithEth = async (address) => {
  return await fetch("http://localhost:3001/register", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      address: address,
    }),
  }).then((json) => json.json());
};

export const loginWithEth = async (address) => {
  try {
    if ((await getNonce(address)).nonce) {
      await login(
        (
          await getNonce(address)
        ).nonce,
        await web3.eth.getCoinbase()
      );

      return true;
    } else return false;
  } catch (e) {
    return false;
  }
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

export const login = async (nonce, address) =>
  await fetch("http://localhost:3001/login", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      signature: await web3.eth.personal.sign(
        "Signing nonce: " + nonce,
        address
      ),
      address: address,
    }),
  }).then((json) => json.json());
