import React, { createContext, useContext, useState } from "react";

import { API_BASE_URL, MACHINE_ID } from "../data/constants";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);

  async function login(password) {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/machines/${MACHINE_ID}`,
        {
          password: password,
        }
      );

      const data = response.data;

      if (data) {
        setLoggedIn(true);
      } else {
        throw new Error("Incorrect Password");
      }
    } catch (error) {
      throw error;
    }
  }

  function logout() {
    setLoggedIn(false);
  }

  return (
    <AuthContext.Provider value={{ loggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
