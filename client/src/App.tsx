import "./App.css";
import { useEffect, useState, useContext } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import FirebaseContext from "./firebase/FirebaseContext";
import { UserAuthForm } from "./components/UserAuthForm";
import { TodosContainer } from "./components/Todos/TodosContainer";
import { Header } from "./components/Header";
import { Loader } from "@mantine/core";

function App(): JSX.Element {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const firebaseContext = useContext(FirebaseContext);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      firebaseContext?.setUser(user);
      setIsAuthenticated(false);
    });

    return () => unsubscribe();
  }, [firebaseContext]);

  if (isAuthenticated) {
    return (
      <div className="loader-container">
        <Loader color="violet" size="xl" />
      </div>
    );
  }

  const user = firebaseContext?.user;

  if (!user) {
    return <UserAuthForm />;
  }

  return (
    <>
      <Header />
      <TodosContainer />
    </>
  );
}

export default App;
