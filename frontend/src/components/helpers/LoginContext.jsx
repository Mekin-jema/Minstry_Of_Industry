import { createContext, useState, useEffect } from "react";

export const LoginContext = createContext();

const LoginProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(!!localStorage.getItem("token"));

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLogin(!!token);
  }, []);

  const login = (token) => {
    localStorage.setItem("token", token);
    setIsLogin(true);  // ✅ Directly update state when logging in
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsLogin(false);  // ✅ Directly update state when logging out
  };

  return (
    <LoginContext.Provider value={{ isLogin, login, logout }}>
      {children}
    </LoginContext.Provider>
  );
};

export default LoginProvider;
