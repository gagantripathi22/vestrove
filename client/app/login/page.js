import React from "react";
import LoginPage from "../../components/login/page";

async function handleLogin(email, password) {
  "use server";
  console.log("handle login working");
  const tryLogin = await fetch(
    `https://seven-stop-backend.onrender.com/api/user/login`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      cache: "no-store",
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    }
  );
  if (tryLogin.status == 200) {
    console.log("success");
    return tryLogin.json();
  } else {
    console.log("fail");
    return "invalid credentials";
  }
}

const Login = async () => {
  // const loginres = await handleLogin();
  // console.log(loginres.user[0].email);
  return (
    <>
      <LoginPage handleLogin={handleLogin} />
    </>
  );
};

export default Login;
