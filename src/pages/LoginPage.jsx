import React from 'react';
import AuthForm from '../components/AuthForm';

const LoginPage = ({ setToken }) => {
  return <AuthForm mode="login" setToken={setToken} />;
};

export default LoginPage;
