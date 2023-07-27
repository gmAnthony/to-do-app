import "./App.css";
import { useContext } from "react";
import FirebaseContext from "./firebase/FirebaseContext";
import { UserAuthForm } from "./components/UserAuthForm";
import { TodosContainer } from "./components/Todos/TodosContainer";
import { Header } from "./components/Header";

function App(): JSX.Element {
  const firebaseContext = useContext(FirebaseContext);

  if (!firebaseContext) {
    return <div>Loading...</div>;
  }

  const { user } = firebaseContext;

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
