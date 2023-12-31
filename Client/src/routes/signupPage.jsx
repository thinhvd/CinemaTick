import React, { useState } from 'react';
import { LockOutlined, UserOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, message } from 'antd';
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
        "phone_number": phone,
    }
    
    function uploadData() {
        // Check if the email already exists
        fetch(`http://fall2324w20g8.int3306.freeddns.org/api/profile`)
            .then(response => response.json())
            .then(data => {
                if (data.email) {
                    // Email already exists, show a message
                    message.error('Email already exists. Please use a different email.');
                } else {
                    // Email doesn't exist, proceed with signup
                    fetch("http://fall2324w20g8.int3306.freeddns.org/api/user/signup", {
                        headers: {
                            'accept': 'application/json, text/plain',
                            'content-type': 'application/json;charset=utf-8'
                        },
                        method: "post",
                        body: JSON.stringify(signupInfo)
                    })
                    .then(response => response.json())
                    .then(data => {
                        console.log(data);
                        message.success('Signup successful!'); // Show success message
                    })
                    .catch(error => {
                        console.error(error);
                        message.error('Signup failed. Please try again.'); // Show error message
                    });
                }
            })
            .catch(error => {
                console.error(error);
                message.error('Error checking email. Please try again.');
            });
    }
    

    const checkReconfirmPassword = () => {
        return password === reconfirmpassword;
    };

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
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        prefix={<MailOutlined className="site-form-item-icon" />}
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
                        prefix={<UserOutlined className="site-form-item-icon" />}
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
                        {
                            pattern: /^\d+$/,
                            message: 'Your Phone number must be numeric',
                        }
                    ]}
                >
                    <Input
                        value={phone}
                        onChange={(event) => setPhone(event.target.value)}
                        prefix={<PhoneOutlined className="site-form-item-icon" />}
                        type="tel"
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
                    <Input.Password
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
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                              if (!value || checkReconfirmPassword()) {
                                return Promise.resolve();
                              }
                              return Promise.reject(new Error('The two passwords do not match!'));
                            },
                        }),
                    ]}
                >
                    <Input.Password
                        value={reconfirmpassword}
                        onChange={(event) => setReconfirmpassword(event.target.value)}
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Re-confirm Password"
                    />
                </Form.Item>
                <Form.Item>
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                        <Checkbox><div style={{color:'#fff'}}>Remember me</div></Checkbox>
                    </Form.Item>

                    <a className="login-form-forgot" href="/forgotpassword">
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
                        <a href={`/login`}>Already have a account, Sign in Now!</a>
                </Form.Item>
            </Form>
        </div>
    );
};