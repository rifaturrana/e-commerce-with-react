import { useState, createContext } from "react";

export const AuthContext = createContext();

const retrieveStoredToken = () => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  return {
    token,
    user,
  };
};

const AuthProvider = ({ children }) => {
  const tokenData = retrieveStoredToken();
  let initialToken = null;
  let initialUser = null;

  if (tokenData) {
    initialToken = tokenData.token;
    initialUser = tokenData.user;
  }

  const [token, setToken] = useState(initialToken);
  const [user, setUser] = useState(initialUser);

  const isUserLoggedIn = !!token;

  const logOutHandler = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  const logInHandler = (user, token) => {
    setToken(token);
    setUser(user);
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
  };

  const authContext = {
    token: token,
    user: user,
    isUserLoggedIn: isUserLoggedIn,
    logIn: logInHandler,
    logOut: logOutHandler,
  };

  return (
    <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
