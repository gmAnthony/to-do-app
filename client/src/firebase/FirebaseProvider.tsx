import { useEffect, useState } from "react";
import FirebaseContext, { FirebaseContextProps } from "./FirebaseContext";
import { auth } from "./firebaseConfig";

interface FirebaseProviderProps {
  children: React.ReactNode;
}

const FirebaseProvider: React.FC<FirebaseProviderProps> = ({ children }) => {
  const [user, setUser] = useState<FirebaseContextProps["user"] | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  return (
    <FirebaseContext.Provider value={{ user, firebase: auth.app }}>
      {children}
    </FirebaseContext.Provider>
  );
};

export default FirebaseProvider;
