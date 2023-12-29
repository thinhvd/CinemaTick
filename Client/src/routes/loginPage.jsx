import React, { useState } from 'react';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import TopBar from '../components/topbar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
    // State variables
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const [currentUser, setCurrentUser] = useState(null);
    const navigate = useNavigate();

    var loginInfo = {
        "email": email,
        "password": password
    }

    // Function that will return current user and also update current username
    // const getCurrentUser = async function () {
    //     const currentUser = await Parse.User.current();
    //     // Update state variable holding current user
    //     setCurrentUser(currentUser);
    //     return currentUser;
    // };
    // const doUserLogIn = async function () {
    //     // Note that these values come from state variables that we've declared before
    //     const usernameValue = username;
    //     const passwordValue = password;
    //     try {
    //         const loggedInUser = await Parse.User.logIn(usernameValue, passwordValue);
    //         // logIn returns the corresponding ParseUser object
    //         alert(
    //             `Success! User ${loggedInUser.get(
    //                 'username'
    //             )} has successfully signed in!`
    //         );
    //         // To verify that this is in fact the current user, `current` can be used
    //         const currentUser = await Parse.User.current();
    //         console.log(loggedInUser === currentUser);
    //         // Clear input fields
    //         setUsername('');
    //         setPassword('');
    //         // Update state variable holding current user
    //         getCurrentUser();
    //         return true;
    //     } catch (error) {
    //         // Error can be caused by wrong parameters or lack of Internet connection
    //         alert(`Error! ${error.message}`);
    //         return false;
    //     }
    // };

    //   async function cout() {
    //     const response = await fetch("http://fall2324w20g8.int3306.freeddns.org/api/user/1", {
    //         method: "get"
    //     });
    //     const movies = await response.json();
    //     console.log(movies);
    //   }

    const handleLogin = async () => {
        try {
            const response = await axios.post("http://fall2324w20g8.int3306.freeddns.org/api/user/login", loginInfo);
            const token = response.data.access_token;
    
          // Lưu token vào localStorage hoặc sessionStorage
            localStorage.setItem('token', token);
        //   localStorage.removeItem("token");
            console.log(token)
            navigate('/');
    
          // Thực hiện các bước tiếp theo sau khi đăng nhập thành công
          // Ví dụ: chuyển hướng đến trang chính của ứng dụng
        } catch (error) {
            console.error('Login failed', error);
        }

      };

    //   axios.get('http://localhost:3001/api/protected-resource', { headers });

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
                        prefix={<MailOutlined className="site-form-item-icon" />}
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        placeholder="Email"
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
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        type="password"
                        placeholder="Password"
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
                        //onClick={() => doUserLogIn()}
                        onClick={() => handleLogin()}
                        type="primary"
                        htmlType="submit"
                        className="login-form-button">
                            Log in
                    </Button>
                    Or <a href={`signup`}>Register now!</a>
                </Form.Item>
            </Form>
        </div>
    );
};