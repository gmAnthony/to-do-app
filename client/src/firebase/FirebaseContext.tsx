import { createContext } from "react";
import { User } from "firebase/auth";
import { FirebaseApp } from "firebase/app";

export type FirebaseContextProps = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  firebase: FirebaseApp;
};

const FirebaseContext = createContext<FirebaseContextProps | null>(null);

export default FirebaseContext;
