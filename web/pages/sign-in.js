import React from 'react';
import Head from 'next/head';
import SignIn from 'container/Auth/SignIn/SignIn';

export default function signInPage() {
  return (
    <>
      <Head>
        <title>登 | 深度旅遊.</title>
      </Head>
      <SignIn />
    </>
  );
}
