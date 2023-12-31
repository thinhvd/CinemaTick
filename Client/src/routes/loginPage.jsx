import React, { useState } from 'react';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input,  message } from 'antd';
import TopBar from '../components/topbar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
    // State variables
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const [currentUser, setCurrentUser] = useState(null);
    const navigate = useNavigate();
    const [errorMsg, setErrorMsg] = useState(null);

    var loginInfo = {
        "email": email,
        "password": password
    }

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
            // Handle authentication errors here
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.error('Login failed. Server responded with:', error.response.data);
                setErrorMsg("Invalid email or password. Please try again.");
            } else if (error.request) {
                // The request was made but no response was received
                console.error('Login failed. No response received from the server.');
                setErrorMsg("An error occurred. Please try again later.");
            } else {
                // Something happened in setting up the request that triggered an Error
                console.error('Login failed. Error setting up the request:', error.message);
                setErrorMsg("An error occurred. Please try again later.");
            }
            // Display the error message to the user
            message.error(errorMsg);
        }

      };

    //   axios.get('http://localhost:3001/api/protected-resource', { headers });

    return (
        <div className='background'>
            <TopBar />
            <Form
                name="normal_login"
                className="account-form"
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
                        {
                            type: 'email',
                            message:'Your email must be in the form of email@example.com'
                        }
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
                    <Input.Password
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        type="password"
                        placeholder="Password"
                    />
                </Form.Item>
                <Form.Item>
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                        <Checkbox><div style={{color:'#fff !important'}}>Remember me</div></Checkbox>
                    </Form.Item>

                    <a className="login-form-forgot" href="/forgotpassword">
                        Forgot password
                    </a>
                </Form.Item>

                <Form.Item>
                    <Button
                        onClick={() => handleLogin()}
                        type="primary"
                        htmlType="submit"
                        className="login-form-button">
                            Log in
                    </Button>
                        <a href={`signup`}>Register now!</a>
                </Form.Item>
            </Form>
        </div>
    );
};