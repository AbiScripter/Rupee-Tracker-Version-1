import React, { useState } from "react";
import { Button, message, Form, Input } from "antd";
import signInUser from "../../utils/signInUtils";

const SignInForm = ({ setIsSignInTab }) => {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const [isLoading, setIsLoading] = useState(false);

  const handleFormSubmit = (data) => {
    signInUser(data, setIsLoading, messageApi);
    // form.resetFields(); //reset the form
  };
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
        <Button>Sign In with Google</Button>
      </Form>
    </div>
  );
};

export default SignInForm;
