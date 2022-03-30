import React, { useState } from "react";
import { getEthAddress, loginWithEth } from "./services/Authentication";
export const Login = () => {
  const [loggedIn, setLoggedIn] = useState(null);
  let address = null;
  return (
    <>
      {(loggedIn === null || loggedIn===false) && <button
        className="btn btn-primary mb-3"
        onClick={async () => {
          address = await getEthAddress();
          if (address) setLoggedIn(await loginWithEth(address.toLowerCase()));
        }}
      >
        {(loggedIn===false && "You are not registered yet or cancelled the sign!! try again" || loggedIn === null && "Login with MetaMask") 
          }
      </button>}
      {loggedIn !== null && loggedIn && (
        <div className="alert alert-success">You successfully logged in!!</div>
      )}
    </>
  );
};
