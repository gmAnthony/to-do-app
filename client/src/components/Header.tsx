import { useContext } from "react";
import FirebaseContext from "../firebase/FirebaseContext";
import { Logo } from "./Logo";
import { auth } from "../firebase/firebaseConfig";

function Header() {
  const firebaseContext = useContext(FirebaseContext);
  if (!firebaseContext) {
    return <div>Loading...</div>;
  }
  const { user } = firebaseContext;
  return (
    <div className="header">
      <Logo />
      <div>
        <span>Hey, {user?.displayName || "Friend"}!</span>
        {user && <button onClick={() => auth.signOut()}>Sign out</button>}
      </div>
    </div>
  );
}

export { Header };
