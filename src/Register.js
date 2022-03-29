import React, { useState } from "react";
import { getEthAddress, loginWithEth } from "./services/Authentication";

export const Register = () => {
  let address = null;
  return (

      <button
        className="btn btn-primary"
        onClick={async (e) => {
            e.preventDefault()
          address = await getEthAddress();
          if (address)
            await loginWithEth(address)
        }}
      >
        Login with MetaMask
      </button>
  );
};
