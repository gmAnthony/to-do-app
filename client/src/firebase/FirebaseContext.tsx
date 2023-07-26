import { createContext } from "react";
import { User } from "firebase/auth";
import { FirebaseApp } from "firebase/app";

export interface FirebaseContextProps {
  user: User | null;
  firebase: FirebaseApp;
}

const FirebaseContext = createContext<FirebaseContextProps | null>(null);

export default FirebaseContext;
