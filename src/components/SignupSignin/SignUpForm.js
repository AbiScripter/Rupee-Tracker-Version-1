import React, { useState } from "react";
import { Button, message, Form, Input } from "antd";
import signUpUser from "../../utils/signUpUtils";
import createDoc from "../../utils/createDocUtils";

const SignUpForm = ({ setIsSignInTab }) => {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const [isLoading, setIsLoading] = useState(false);

  async function handleFormSubmit(data) {
    const userData = await signUpUser(data, setIsLoading, messageApi);
    //if signin succes it return userdata
    //if signin fails it returns null
    if (userData !== null) {
      console.log(userData);
      createDoc(userData, data.username, messageApi);
    }

    // form.resetFields(); //reset the form
  }

  return (
    <div>
      {contextHolder}
      <h3>
        Sign Up with <span style={{ color: "orange" }}> Rupee Tracker</span>
      </h3>
      <Form
        onFinish={handleFormSubmit}
        form={form}
        variant="filled"
        style={{ maxWidth: 600 }}
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>

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

        <Form.Item
          name="confirm"
          label="Confirm Password"
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The new password that you entered do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Button type="primary" block htmlType="submit" loading={isLoading}>
          Sign Up
        </Button>

        <p>
          Already have an account
          <button onClick={() => setIsSignInTab((prev) => !prev)}>
            SignIn
          </button>
        </p>
        <Button>Sign Up with Google</Button>
      </Form>
    </div>
  );
};

export default SignUpForm;
