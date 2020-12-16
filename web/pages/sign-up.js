import React from 'react';
import Head from 'next/head';
import SignUp from 'container/Auth/SignUp/SignUp';

export default function signUpPage() {
  return (
    <>
      <Head>
        <title>註冊 | 深度旅遊.</title>
      </Head>
      <SignUp />
    </>
  );
}
