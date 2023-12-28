import React, { useState } from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import TopBar from '../components/topbar';

export default function SignupPage() {
    // State variables
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullname, setFullname] = useState('');
    const [phone, setPhone] = useState('');
    const [reconfirmpassword, setReconfirmpassword] = useState('');

    var signupInfo = {
        "fullname": fullname,
        "password": password,
        "email": email,
        "phone_number": phone
    }

    // Functions used by the screen components
    const doUserRegistration = async function () {
        // Note that these values come from state variables that we've declared before
        const usernameValue = username;
        const passwordValue = password;
        try {
            // Since the signUp method returns a Promise, we need to call it using await
            const createdUser = await Parse.User.signUp(usernameValue, passwordValue);
            alert(
                `Success! User ${createdUser.getUsername()} was successfully created!`
            );
            return true;
        } catch (error) {
            // signUp can fail if any parameter is blank or failed an uniqueness check on the server
            alert(`Error! ${error}`);
            return false;
        }
    };
    function uploadData() {
        fetch("http://fall2324w20g8.int3306.freeddns.org/api/user/signup", {
            headers: {
                'accept': 'application/json, text/plain',
                'content-type': 'application/json;charset=utf-8'
            },
            method: "post",
            body: JSON.stringify(signupInfo)
        }).then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.error(error));
    }

    return (
        <div className='background'>
            <TopBar />
            <Form
                name="normal_login"
                className="login-form"
                initialValues={{
                    remember: true,
                }}
            >
                <Form.Item
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Email!',
                        },
                    ]}
                >
                    <Input
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        prefix={<UserOutlined className="site-form-item-icon" />}
                        type="email"
                        placeholder="Email"
                    />
                </Form.Item>
                <Form.Item
                    name="fullname"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Full Name!',
                        },
                    ]}
                >
                    <Input
                        value={fullname}
                        onChange={(event) => setFullname(event.target.value)}
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        placeholder="Fullname"
                    />
                </Form.Item>
                <Form.Item
                    name="Phone"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Phone Number!',
                        },
                    ]}
                >
                    <Input
                        value={phone}
                        onChange={(event) => setPhone(event.target.value)}
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="phone"
                        placeholder="Phone Number"
                    />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Password!',
                        },
                    ]}
                >
                    <Input
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Password"
                    />
                </Form.Item>
                <Form.Item
                    name="reconfirm password"
                    rules={[
                        {
                            required: true,
                            message: 'Please re-confirm your Password!',
                        },
                    ]}
                >
                    <Input
                        value={reconfirmpassword}
                        onChange={(event) => setReconfirmpassword(event.target.value)}
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="re-confirm password"
                        placeholder="Re-confirm Password"
                    />
                </Form.Item>
                <Form.Item>
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    <a className="login-form-forgot" href="">
                        Forgot password
                    </a>
                </Form.Item>

                <Form.Item>
                    <Button
                        onClick={() => uploadData()}
                        type="primary"
                        htmlType="submit"
                        className="login-form-button">
                        Sign Up
                    </Button>
                    Or <a href={`/login`}>Already have a account, Sign in Now!</a>
                </Form.Item>
            </Form>
        </div>
    );
};