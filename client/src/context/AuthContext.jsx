import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

//   // Check logged-in user
//   const checkAuth = async () => {
//     try {
//       const response = await api.get("/auth/me");

//       setUser(response.data.user);
//     } catch (error) {
//       setUser(null);
//     } finally {
//       setLoading(false);
//     }
//   };

useEffect(() => {
  let isMounted = true;

  const runCheckAuth = async () => {
    try {
      const response = await api.get("/auth/me");
      if (isMounted) setUser(response.data.user);
    } catch {
      if (isMounted) setUser(null);
    } finally {
      if (isMounted) setLoading(false);
    }
  };

  runCheckAuth();

  return () => {
    isMounted = false;
  };
}, []);

  const login = async (email, password) => {
    const response = await api.post("/auth/login", {
      email,
      password,
    });

    setUser(response.data.user);

    return response.data;
  };

  const signup = async (name, email, password) => {
    const response = await api.post("/auth/signup", {
      name,
      email,
      password,
    });

    setUser(response.data.user);

    return response.data;
  };

  const logout = async () => {
    try {
      await api.post("/auth/logout");
    } finally {
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  return useContext(AuthContext);
};