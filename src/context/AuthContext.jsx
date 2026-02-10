import { createContext, useState, useEffect } from "react";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8082";

export const AuthContext = createContext();

const isTokenExpired = (token) => {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.exp * 1000 < Date.now();
  } catch {
    return true;
  }
};

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedJwt = localStorage.getItem("Jwt");
    const savedUser = localStorage.getItem("user");

    if (savedUser && savedJwt) {
      if (isTokenExpired(savedJwt)) {
        localStorage.removeItem("Jwt");
        localStorage.removeItem("user");
      } else {
        setToken(savedJwt);
        setUser(JSON.parse(savedUser));
      }
    }
    setLoading(false);
  }, []);

  const login = async (username, password) => {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    if (!response.ok) {
      const contentType = response.headers.get("content-type");
      let errorMessage = `Login failed: ${response.status}`;

      if (contentType && contentType.includes("application/json")) {
        // Response is JSON
        const errorData = await response.json();

        if (errorData.fieldErrors) {
          const errors = Object.values(errorData.fieldErrors);
          errorMessage = errors.join(". ");
        } else if (errorData.message) {
          errorMessage = errorData.message;
        } else if (errorData.error) {
          errorMessage = errorData.error;
        }
      } else {
        const text = await response.text();
        errorMessage = text || errorMessage;
      }

      throw new Error(errorMessage);
    }
    const data = await response.json();

    const userObject = { username: data.username };

    setToken(data.token);
    setUser(userObject);
    localStorage.setItem("Jwt", data.token);
    localStorage.setItem("user", JSON.stringify(userObject));
  };

  const register = async (username, email, password) => {
    const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    });
    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(
        errorMessage || `Registration failed: ${response.status}`
      );
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
