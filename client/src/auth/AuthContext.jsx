import { createContext, useContext, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebaseConfig.js";
import axios from "axios";

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // Firebase has a persisted user — refresh the session cookie
        try {
          const idToken = await firebaseUser.getIdToken(true);
          await axios.post(
            `${import.meta.env.VITE_API_URL}/auth/refresh-session`,
            {},
            {
              headers: { Authorization: `Bearer ${idToken}` },
              withCredentials: true,
            }
          );
          setUser(firebaseUser);
        } catch (error) {
          console.log("Session refresh failed", error);
          setUser(null);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
