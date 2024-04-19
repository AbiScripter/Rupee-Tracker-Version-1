import { signInWithEmailAndPassword } from "firebase/auth";

import { auth } from "../firebase";

async function signin(auth, email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    // Successfully signed in
    const user = userCredential.user;
    return user;
  } catch (error) {
    // Handle errors
    const errorMessage = error.message;
    throw new Error(errorMessage);
  }
}

async function signInUser(data, setIsLoading, messageApi) {
  setIsLoading(true);
  try {
    const user = await signin(auth, data.email, data.password);
    console.log(user);
    messageApi.open({
      type: "success",
      content: "Successfully Logged In",
    });
    setIsLoading(false);
    return user;
  } catch (error) {
    messageApi.open({
      type: "error",
      content: error.message,
    });
    setIsLoading(false);
    return null;
  }
}
export default signInUser;

// signInWithEmailAndPassword(auth, email, password)
//   .then((userCredential) => {
//     // Signed in
//     const user = userCredential.user;
//     // ...
//   })
//   .catch((error) => {
//     const errorCode = error.code;
//     const errorMessage = error.message;
//   });
