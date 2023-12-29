import { useEffect, useState } from 'react';
import TopBar from '../components/topbar';
import { UserOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons';
import { Form, Input, Button, Spin } from 'antd';
import axios from 'axios';

function Profile() {
  const token = localStorage.getItem('token');
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getData();
  }, []);

  function getData() {
    axios({
      method: 'GET',
      url: 'http://fall2324w20g8.int3306.freeddns.org/api/profile',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })
      .then((response) => {
        const res = response.data;
        setProfileData(res);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <div className='background'>
      <TopBar />
      {loading ? (
        <Spin size='large' />
      ) : (
        <Form
          name='profile_form'
          className='profile-form'
          initialValues={{
            fullname: profileData?.fullname,
            email: profileData?.email,
            phone_number: profileData?.phone_number,
            // Add other fields as needed
          }}
        >
          <Form.Item label='Full Name' name='fullname'>
            <Input
              prefix={<UserOutlined className='site-form-item-icon' />}
              placeholder='Full Name'
              disabled
              style={{ color: 'white' }}
            />
          </Form.Item>

          <Form.Item label='Email' name='email'>
            <Input
              prefix={<MailOutlined className='site-form-item-icon' />}
              placeholder='Email'
              disabled
              style={{ color: 'white' }}
            />
          </Form.Item>

          <Form.Item label='Phone Number' name='phone_number'>
            <Input
              prefix={<PhoneOutlined className='site-form-item-icon' />}
              placeholder='Phone Number'
              disabled
              style={{ color: 'white' }}
            />
          </Form.Item>
        </Form>
      )}
    </div>
  );
}

export default Profile;
