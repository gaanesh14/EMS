import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
  const stored = sessionStorage.getItem("user");
  return stored ? JSON.parse(stored) : null;
});

const [role, setRole] = useState(() => {
  const stored = sessionStorage.getItem("user");
  return stored ? JSON.parse(stored).role : null;
});

  const syncUser = () => {
    const token = sessionStorage.getItem("accessToken");
    const storedUser = sessionStorage.getItem("user");

    if (!token) {
      setUser(null);
      setRole(null);
      return;
    }

    if (storedUser && storedUser !== "undefined") {
      try{
        const parsed = JSON.parse(storedUser);
      setUser(parsed);
      setRole(parsed.role);
      }catch(error){
        console.error("Error parsing user from sessionStorage:", error);
        sessionStorage.removeItem("user");
        setUser(null);
        setRole(null);
      }
      
    } else {
      setUser(null);
      setRole(null);
    }
  };

  useEffect(() => {
    syncUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, role, syncUser }}>
      {children}
    </AuthContext.Provider>
  );
};

