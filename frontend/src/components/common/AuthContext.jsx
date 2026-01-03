import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);

  const syncUser = () => {
    const storedUser = sessionStorage.getItem("user");

    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      setUser(parsed);
      setRole(parsed.role);
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

