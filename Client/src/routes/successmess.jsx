import { Button, Form } from 'antd';
import TopBar from '../components/topbar';

export default function Successmess() {
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
                    <div style={{color:'white', fontSize:'1vw' }}>Mật khẩu đã được cập nhật thành công, vui lòng check Email của bạn</div>
                </Form.Item>
                <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            href='/'
                            className="login-form-button">
                            Trở về màn hình chính
                        </Button>

                </Form.Item>
            </Form>
        </div>
    );
};