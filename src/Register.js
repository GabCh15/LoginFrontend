import React, { useState } from "react";
import { getEthAddress, registerWithEth } from "./services/Authentication";

export const Register = () => {
  const [success, setSuccess] = useState(null);
  let address = null;

  return (
    <>
      {success === null && (
        <button
          className="btn btn-primary"
          onClick={async () => {
            address = await getEthAddress();
            if (address)
              setSuccess(
                (await registerWithEth(address.toLowerCase())).success
              );
          }}
        >
          Register with MetaMask
        </button>
      )}
      {success !== null && (success &&(
        <div className="alert alert-success">Succesfully registered</div>
      )||<div className="alert alert-danger">You're already registered</div>)}
    </>
  );
};
