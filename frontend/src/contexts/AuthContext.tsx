import React, { useContext, useEffect, useState } from "react";

interface User {
  name: string;
  email: string;
  token: string;
  verified: boolean;
}

interface AuthContextInterface {
  currentUser: User | undefined;
}

export const AuthContext = React.createContext<AuthContextInterface | null>(
  null
);

export const useAuth = () => {
  return useContext(AuthContext);
};

export function AuthProvider({ children }: any) {
  const [currentUser, setCurrentUser] = useState<User | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = localStorage.getItem("user");
    const { name, email, token, verified } = JSON.parse(user || "{}");
    setCurrentUser({ name, email, token, verified });
    setLoading(false);
  }, []);

  const value = {
    currentUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
