import React, { useState } from 'react';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import TopBar from '../components/topbar';
import Link from 'antd/es/typography/Link';
import { useNavigate } from 'react-router-dom';

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();
    var emailsend = {
        "email": email
    }
    function uploadDataForgotPassword() {
        navigate('/successmess');
        fetch("http://fall2324w20g8.int3306.freeddns.org/api/user/reset_pass_request", {
            headers: {
                'accept': 'application/json, text/plain',
                'content-type': 'application/json;charset=utf-8'
            },
            method: "post",
            body: JSON.stringify(emailsend)

        }).then(response => {
            response.json()
            console.log(JSON.stringify(emailsend))
        })
            .then(data => console.log(data))
            .catch(error => console.error(error));
    }
    //   axios.get('http://localhost:3001/api/protected-resource', { headers });

    return (
        <div className='background'>
            <TopBar />
            <Form
                name="forgot_password"
                className="account-form"
                initialValues={{
                    remember: true,
                }}
            >
                <Form.Item>
                    <div style={{color:'white', fontSize:'1vw' }}>Để lấy lại mật khẩu, hãy nhập Email của bạn</div>
                </Form.Item>
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
                <Form.Item>
                    
                        <Button
                            onClick={() => uploadDataForgotPassword()}
                            type="primary"
                            htmlType="submit"
                            className="login-form-button">
                            Submit
                        </Button>
                    
                </Form.Item>
            </Form>
        </div>
    );
};