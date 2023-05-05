"use client";

import jwt_decode from "jwt-decode";

const VerifyJwt = async () => {
  const token = localStorage.getItem("access-token");
  if (token) {
    try {
      var decoded = await jwt_decode(token);
      var current_time = new Date().getTime() / 1000;
      if (current_time > decoded.exp) {
        await localStorage.removeItem("access-token");
        return false;
      } else {
        return true;
      }
    } catch (error) {
      console.log("Error Verifying Token, " + error);
      return false;
    }
  } else {
    return false;
  }
};

export default VerifyJwt;
