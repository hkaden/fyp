import React, { useState, Component, useEffect } from 'react';
import Router from 'next/router';
import jsCookie from 'js-cookie';
import nextCookies from 'next-cookies';

export const AuthContext = React.createContext();




const AuthProvider = (props) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    // console.log (JSON.parse(localStorage.getItem('user')))
    if(localStorage.getItem('user')) {
      setLoggedIn(true)
      setUser(JSON.parse(localStorage.getItem('user')))
    }
  },[]);

  const signIn = (params) => {
    const { token, user } = params;
    console.log(params, 'sign in form Props');
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    //setUser(user);
    setLoggedIn(true);
    Router.push(`/`);
  };

  const signUp = (params) => {
    console.log(params, 'sign up form Props');
  //  setUser(fakeUserData);
   // setLoggedIn(true);
    Router.push(`/`);
  };

  const logOut = () => {
    setLoggedIn(false);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    Router.push(`/`);
  };


  return (
    <AuthContext.Provider
      value={{
        loggedIn,
        logOut,
        signIn,
        signUp,
        user,
      }}
    >
      <>{props.children}</>
    </AuthContext.Provider>
  );
};

export default AuthProvider;
