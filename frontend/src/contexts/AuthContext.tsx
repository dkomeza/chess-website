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

const AuthContext = React.createContext<AuthContextInterface>(
  {} as AuthContextInterface
);

export const useAuth = () => {
  return useContext(AuthContext);
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      const user = getUserFromLocalStorage();
      if (user && user.token) {
        await auth(user);
      }
    }
    loadUser().then(() => setLoading(false));
  }, []);

  const value = {
    currentUser,
  };

  async function auth(user: User) {
    console.log(user);
    const res = await fetch("/api/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    if (!res.ok) {
      return;
    }
    const data = await res.json();
    if (data.error) {
      console.log(data.error);
      return;
    }
    localStorage.setItem("user", JSON.stringify(data));
    setCurrentUser(data);
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export default AuthContext;

const getUserFromLocalStorage = () => {
  const user = localStorage.getItem("user");
  const { name, email, token, verified } = JSON.parse(user || "{}");
  return { name, email, token, verified };
};
