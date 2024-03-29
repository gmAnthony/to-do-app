import { useEffect, useState } from "react";
import FirebaseContext, { FirebaseContextProps } from "./FirebaseContext";
import { auth } from "./firebaseConfig";

type FirebaseProviderProps = {
  children: React.ReactNode;
};

const FirebaseProvider: React.FC<FirebaseProviderProps> = ({ children }) => {
  const [user, setUser] = useState<FirebaseContextProps["user"] | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  return (
    <FirebaseContext.Provider value={{ user, setUser, firebase: auth.app }}>
      {children}
    </FirebaseContext.Provider>
  );
};

export default FirebaseProvider;
