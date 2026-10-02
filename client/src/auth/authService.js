import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "./firebaseConfig.js";

export const googleLogin = async () => {
  const result = await signInWithPopup(auth, googleProvider);
  const user = result.user;

  const idToken = await user.getIdToken();

  return { user, idToken };
};
