import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);

  function login(password) {
    return new Promise((resolve, reject) => {
      if (password === "password") {
        setLoggedIn(true);
        resolve("success");
      } else {
        reject("Incorrect Password");
      }
    });
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
