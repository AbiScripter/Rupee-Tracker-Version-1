import React, { useState } from "react";
import { Button, message, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";

import signInUser from "../../utils/signInUtils";
import googleSignIn from "../../utils/googleSignIn";
import createDoc from "../../utils/createDocUtils";

const SignInForm = ({ setIsSignInTab }) => {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  async function handleFormSubmit(data) {
    const userData = await signInUser(data, setIsLoading, messageApi);
    //if signin succes it return userdata
    //if signin fails it returns null
    if (userData !== null) {
      console.log(userData);
      await delay(1000); //imitating a fake delay of 1second
      navigate("/dashboard");
    }
    // form.resetFields(); //reset the form
  }

  async function handleGoogleSignIn() {
    const googleData = await googleSignIn(setIsLoading, messageApi);
    console.log(googleData);
    createDoc(googleData.user, "random", messageApi);
    await delay(2000);
    navigate("/dashboard");
  }

  return (
    <div>
      {contextHolder}
      <h3>
        Sign In with <span style={{ color: "orange" }}> Rupee Tracker</span>
      </h3>
      <Form
        onFinish={handleFormSubmit}
        form={form}
        variant="filled"
        style={{ maxWidth: 600 }}
      >
        <Form.Item
          name="email"
          label="E-mail"
          rules={[
            {
              type: "email",
              message: "The input is not valid E-mail!",
            },
            {
              required: true,
              message: "Please input your E-mail!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>

        <Button type="primary" block htmlType="submit" loading={isLoading}>
          Sign In
        </Button>
        <p>
          Don't have an acoount
          <button onClick={() => setIsSignInTab((prev) => !prev)}>
            Sign Up
          </button>
        </p>
        <Button
          type="primary"
          block
          onClick={handleGoogleSignIn}
          loading={isLoading}
        >
          Sign In with Google
        </Button>
      </Form>
    </div>
  );
};

export default SignInForm;
