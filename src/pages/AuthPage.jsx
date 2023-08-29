import React, { useEffect, useState } from 'react';
import { Amplify, Auth } from 'aws-amplify';
import AdminSignIn from './AdminSignIn';
import Ecommerce from './Ecommerce';



const AuthPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      await Auth.currentAuthenticatedUser();
      setIsAuthenticated(true);
    } catch (error) {
      setIsAuthenticated(false);
    }
  };

  return (
    <div>
      {isAuthenticated ? <Ecommerce /> : <AdminSignIn />}
    </div>
  );
};

export default AuthPage;