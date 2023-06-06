import React from "react";
import LoginPage from "../../components/login/page";

async function handleLogin(email, password) {
  "use server";
  console.log("handle login working");
  const tryLogin = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/user/login`,
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

async function handleSignUp(firstname, lastname, email, password) {
  "use server";
  console.log("handle signup working");
  const tryLogin = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/user/signup`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      cache: "no-store",
      body: JSON.stringify({
        firstname: firstname,
        lastname: lastname,
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
    return "error signing up";
  }
}

const Login = async () => {
  // const loginres = await handleLogin();
  // console.log(loginres.user[0].email);
  return (
    <>
      <LoginPage handleLogin={handleLogin} handleSignUp={handleSignUp} />
    </>
  );
};

export default Login;
