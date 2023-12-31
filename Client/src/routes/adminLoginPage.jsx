import { Flex, Typography, Form, Input, Button, message } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import background from '../images/background.jpg';
import { adminLogin } from '../api/adminLogin';

const { Title } = Typography;
const { Item } = Form;

function AdminLoginPage({ setLogin }) {
    const navigate = useNavigate();
    const [form] = Form.useForm();

    const onFinish = async (values) => {
        //todo: call api to authenticate admin user and set to localstorage

        //todo: if auth is true set login true to localstorage
        const res = await adminLogin(values);
        if (res.ok) {
            setSessionStore(true);
            setLogin(true);
            navigate('/admin/users');
        } else if (res.status >= 500) {
            message.error('Server error, please try again!');
        } else {
            message.error('Username or Password incorrect!');
        }
    };

    const setSessionStore = (value) => {
        sessionStorage.setItem('is_login', `${value}`);
    };

    return (
        <Flex vertical justify='center' align='center' style={{ height: '100vh', backgroundImage: `url(${background})`, backgroundSize:'cover', backgroundRepeat:'no-repeat' }}>
            <Title style={{color:'white'}}>Admin Login</Title>

            <Form
                form={form}
                name='basic'
                style={{

                }}
                onFinish={onFinish}
            >
                <Item
                    label='Username'
                    name='username'
                    rules={[
                        {
                            required: true,
                            message: 'Please input your username!',
                        },
                    ]}
                >
                    <Input />
                </Item>

                <Item
                    label='Password'
                    name='password'
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                >
                    <Input.Password />
                </Item>

                <Item
                    wrapperCol={{
                        offset: 8,
                    }}
                >
                    <Button size='large' type='primary' htmlType='submit'>
                        Login
                    </Button>
                </Item>
            </Form>
        </Flex>
    );
}

export default AdminLoginPage;
