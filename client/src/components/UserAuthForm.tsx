import { useState } from "react";
import {
  signInWithEmailAndPassword,
  signInAnonymously,
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

type LoginTypeOptions = {
  label: string;
  value: "login" | "register" | "anonymous";
};
const LoginTypeOptions: LoginTypeOptions[] = [
  { label: "Login", value: "login" },
  { label: "Register", value: "register" },
  { label: "Anonymous", value: "anonymous" },
];

function UserAuthForm() {
  const [email, setEmail] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<FirebaseError | null>(null);
  const [loginType, setLoginType] =
    useState<LoginTypeOptions["value"]>("login");

  const handleLogin = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    if (loginType === "anonymous") {
      signInAnonymously(auth)
        .then((userCredential) => {
          let user = userCredential.user;
          console.log(user);
        })
        .catch((error) => {
          let errorCode = error.code;
          let errorMessage = error.message;
          console.log(errorCode, errorMessage);
        });
      return;
    }

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
        data={LoginTypeOptions}
        value={loginType}
        onChange={(value) => setLoginType(value as LoginTypeOptions["value"])}
      />
      <Card
        className="auth-form-card"
        shadow="sm"
        padding="lg"
        radius="md"
        withBorder
      >
        <form
          onSubmit={loginType !== "register" ? handleLogin : handleRegister}
        >
          {loginType === "register" && (
            <Input
              placeholder="Display Name"
              value={displayName}
              onChange={(event) => setDisplayName(event.currentTarget.value)}
            />
          )}
          {loginType !== "anonymous" && (
            <>
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
            </>
          )}
          {loginType === "anonymous" && (
            <p style={{ textAlign: "left" }}>
              Logging in anonymously will allow you to use the app without
              creating an account, but nothing you do will be saved. 😕
            </p>
          )}
          {loginType === "login" && (
            <Button color="teal" type="submit">
              Login
            </Button>
          )}
          {loginType === "register" && (
            <Button color="teal" type="submit">
              Register
            </Button>
          )}
          {loginType === "anonymous" && (
            <Button color="teal" type="submit">
              Enter
            </Button>
          )}
        </form>
      </Card>
      {error && <p>{error.message}</p>}
    </Center>
  );
}

export { UserAuthForm };
