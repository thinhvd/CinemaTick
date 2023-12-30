import { Button, Form } from 'antd';
import TopBar from '../components/topbar';

export default function Successmess() {
    return (
        <div className='background'>
            <TopBar />
            <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
            <p className='forgotpasswordtext'>Mật khẩu đã được cập nhật thành công, vui lòng check Email của bạn</p>
            <Form
                name="forgot_password"
                className="forgot_password-form"
                initialValues={{
                    remember: true,
                }}
            >
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