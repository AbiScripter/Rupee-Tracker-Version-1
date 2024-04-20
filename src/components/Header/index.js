import React, { useEffect } from "react";
import "./styles.css";
import { auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { Button, message } from "antd";

// signOut(auth)
//   .then(() => {
//     // Sign-out successful.
//   })
//   .catch((error) => {
//     // An error happened.
//   });
const Header = () => {
  const navigate = useNavigate();
  const [user, loading] = useAuthState(auth);
  const [messageApi, contextHolder] = message.useMessage();

  async function handleSignOut() {
    try {
      await signOut(auth);
      // Sign-out successful.
      navigate("/");
      messageApi.open({
        type: "success",
        content: "Signing Out...",
      });
    } catch (error) {
      // An error happened.
      console.error(error.message);
      throw new Error(error.message);
    }
  }

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, loading]);

  return (
    <div className="nav-bar">
      {contextHolder}

      <h3>Rupee Tracker</h3>

      {user && <Button onClick={handleSignOut}>Sign Out</Button>}
    </div>
  );
};

export default Header;
