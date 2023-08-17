import React from 'react';
import LoginPage from '../../components/login/page';

async function handleLogin(email, password) {
  'use server';
  const tryLogin = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/user/login`,
    {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    }
  );
  if (tryLogin.status == 200) {
    return tryLogin.json();
  } else {
    return 'invalid credentials';
  }
}

async function handleSignUp(firstname, lastname, email, password) {
  'use server';
  const trySignup = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/user/signup`,
    {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
      body: JSON.stringify({
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: password,
      }),
    }
  );
  if (trySignup.status == 200) {
    return trySignup.json();
  } else {
    return 'error signing up';
  }
}

const Login = async () => {
  return (
    <>
      <LoginPage handleLogin={handleLogin} handleSignUp={handleSignUp} />
    </>
  );
};

export default Login;
