import { getDoc } from "firebase/firestore";
import { db, doc, setDoc } from "../firebase";

async function createDoc(user, username, messageApi) {
  console.log(user, username);
  //getting userdata
  const userRef = doc(db, "users", user.uid);
  const userData = await getDoc(userRef);

  //only create doc if userdata don't already exists in database
  //else dont create doc
  if (!userData.exists()) {
    try {
      const currTimeStamp = user.metadata.createdAt;
      const createdAt = new Date(Number(currTimeStamp));

      await setDoc(doc(db, "users", user.uid), {
        name: user.displayName ? user.displayName : username,
        email: user.email,
        photoURl: user.photoURL ? user.photoURL : "",
        createdAt: createdAt,
      });

      messageApi.open({
        type: "success",
        content: "Logging In...",
      });
    } catch (error) {
      messageApi.open({
        type: "error",
        content: error.message,
      });
    }
  } else {
    messageApi.open({
      type: "error",
      content: "Doc Already Exists",
    });
  }
}

export default createDoc;
