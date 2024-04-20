import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth, provider } from "../firebase";

async function googleSignIn(setIsLoading, messageApi) {
  setIsLoading(true);
  try {
    const result = await signInWithPopup(auth, provider);
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    // IdP data available using getAdditionalUserInfo(result)
    // ...
    setIsLoading(false);

    return { user, token };
  } catch (error) {
    setIsLoading(false);
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;

    if (errorCode === "auth/popup-closed-by-user") {
      messageApi.open({
        type: "error",
        content: errorMessage,
      });
      setIsLoading(false);
    } else {
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      setIsLoading(false);

      messageApi.open({
        type: "error",
        content: errorMessage,
      });
    }
  }
}

export default googleSignIn;

//   signInWithPopup(auth, provider)
//     .then((result) => {
//       // This gives you a Google Access Token. You can use it to access the Google API.
//       const credential = GoogleAuthProvider.credentialFromResult(result);
//       const token = credential.accessToken;
//       // The signed-in user info.
//       const user = result.user;
//       // IdP data available using getAdditionalUserInfo(result)
//       // ...
//     })
//     .catch((error) => {
//       // Handle Errors here.
//       const errorCode = error.code;
//       const errorMessage = error.message;
//       // The email of the user's account used.
//       const email = error.customData.email;
//       // The AuthCredential type that was used.
//       const credential = GoogleAuthProvider.credentialFromError(error);
//       // ...
//     });
