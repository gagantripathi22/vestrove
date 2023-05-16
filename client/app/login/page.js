import React from "react";
import LoginPage from "../../components/login/page";

async function handleLogin(email, password) {
  "use server";
  console.log("handle login working");
  const tryLogin = await fetch(`http://localhost:8080/api/user/login`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  });
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
