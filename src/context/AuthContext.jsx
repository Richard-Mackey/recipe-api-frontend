import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedJwt = localStorage.getItem("Jwt");
    const savedUser = localStorage.getItem("user");

    if (savedUser && savedJwt) {
      setToken(savedJwt);
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (username, password) => {
    const response = await fetch("http://localhost:8082/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    if (!response.ok) {
      throw new Error(`Invalid credentials: ${response.status}`);
    }
    const data = await response.json();

    const userObject = { username: data.username };

    setToken(data.token);
    setUser(userObject);
    localStorage.setItem("Jwt", data.token);
    localStorage.setItem("user", JSON.stringify(userObject));
  };

  const register = async (username, email, password) => {
    const response = await fetch("http://localhost:8082/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    });
    if (!response.ok) {
      throw new Error(`Invalid credentials: ${response.status}`);
    }
    const data = await response.json();
    const userObject = { username: data.username };

    setToken(data.token);
    setUser(userObject);
    localStorage.setItem("Jwt", data.token);
    localStorage.setItem("user", JSON.stringify(userObject));
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("Jwt");
    localStorage.removeItem("user");
  };

  const value = {
    token,
    user,
    loading,
    login,
    register,
    logout,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
