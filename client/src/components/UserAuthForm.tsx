import { useState } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { auth } from "../firebase/firebaseConfig";
import {
  Button,
  Card,
  Center,
  Input,
  PasswordInput,
  SegmentedControl,
} from "@mantine/core";

function UserAuthForm() {
  const [email, setEmail] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<FirebaseError | null>(null);
  const [isLogin, setIsLogin] = useState(true);

  const handleLogin = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        setError(error);
      }
    }
  };

  const handleRegister = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (userCredential.user) {
        await updateProfile(userCredential.user, { displayName });
      }
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        setError(error);
      }
    }
  };

  return (
    <Center maw={100} mx="auto" className="auth-form">
      <SegmentedControl
        data={[
          { label: "Login", value: "login" },
          { label: "Register", value: "register" },
        ]}
        value={isLogin ? "login" : "register"}
        onChange={(value) => setIsLogin(value === "login")}
      />
      <Card
        className="auth-form-card"
        shadow="sm"
        padding="lg"
        radius="md"
        withBorder
      >
        <form onSubmit={isLogin ? handleLogin : handleRegister}>
          {!isLogin && (
            <Input
              placeholder="Display Name"
              value={displayName}
              onChange={(event) => setDisplayName(event.currentTarget.value)}
            />
          )}
          <Input
            required
            type="email"
            placeholder="Email"
            value={email}
            onChange={(event) => setEmail(event.currentTarget.value)}
          />

          <PasswordInput
            required
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.currentTarget.value)}
          />
          {isLogin ? (
            <Button color="teal" type="submit">
              Login
            </Button>
          ) : (
            <Button color="teal" type="submit">
              Register
            </Button>
          )}
        </form>
      </Card>
      {error && <p>{error.message}</p>}
    </Center>
  );
}

export { UserAuthForm };
