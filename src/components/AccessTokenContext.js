import React, { createContext, useContext, useState, useEffect } from 'react';
import { API_URL } from '../config/constants';
import axios from 'axios';

const AccessTokenContext = createContext();

export const useAccessToken = () => {
  return useContext(AccessTokenContext);
};

export const isActiveToken = async (accessToken) => {
  try {
    const response = await axios.post(`${API_URL}/auth`, { accessToken });
    const result = response.data.result;
    if (result && result.id) {
      return { accessResult: true, user_id: result.id };
    } else {
      return { accessResult: false };
    }
  } catch (error) {
    console.error("Token verification failed:", error);
    return { accessResult: false };
  }
};

export const AccessTokenProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken'));
  const [accessResult, setAccessResult] = useState(null);
  const [user_id, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyToken = async () => {
      if (accessToken) {
        const result = await isActiveToken(accessToken);
        console.log("Token verification result:", result);
        setAccessResult(result.accessResult);
        setUserId(result.user_id || null);
      } else {
        setAccessResult(false);
        setUserId(null);
      }
      setLoading(false);
    };
    verifyToken();
  }, [accessToken]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AccessTokenContext.Provider value={{ accessToken, setAccessToken, accessResult, user_id, loading }}>
      {children}
    </AccessTokenContext.Provider>
  );
};

export default AccessTokenContext;
