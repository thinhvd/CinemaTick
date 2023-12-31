import { useEffect, useState } from "react";
import TopBar from "../components/topbar";
import { UserOutlined, MailOutlined, PhoneOutlined, LockOutlined } from "@ant-design/icons";
import { Form, Input, Button, Space, message } from "antd";
import axios from "axios";
import HistoryTable from "../components/history";

function Profile() {
  const token = localStorage.getItem("token");
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showPasswordFields, setShowPasswordFields] = useState(false);

  const [old_pass, setOldPassword] = useState([]);
  const [new_pass, setNewPassword] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  function getData() {
    axios({
      method: "GET",
      url: "http://fall2324w20g8.int3306.freeddns.org/api/profile",
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => {
        const res = response.data;
        setProfileData(res);
        console.log(profileData)
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  const handleTogglePasswordFields = () => {
    setShowPasswordFields((prev) => !prev);
  };

  var changePass = {
    "old_pass": old_pass,
    "new_pass": new_pass,
  };

  const onFinishChangePassword = async () => {
    try {
      const response = await axios.post(
        "http://fall2324w20g8.int3306.freeddns.org/api/user/change_pass",
        changePass,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      message.success("Mật khẩu đã đổi thành công!");
    } catch (error) {
      console.error("Change Password failed", error);
    }
  };

  return (
    <div className="background">
      <TopBar />
      {profileData ?(
      <Space className="profilePage" direction="horizontal">
        <Form
          name="profile_form"
          className="profile-form"
          initialValues={{
            fullname: profileData?.fullname,
            email: profileData?.email,
            phone_number: profileData?.phone_number,
          }}
        >
          <Form.Item label="Full Name" name="fullname">
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Full Name"
              disabled
              style={{ color: "white" }}
            />
          </Form.Item>

          <Form.Item label="Email" name="email">
            <Input
              prefix={<MailOutlined className="site-form-item-icon" />}
              placeholder="Email"
              disabled
              style={{ color: "white" }}
            />
          </Form.Item>

          <Form.Item label="Phone Number" name="phone_number">
            <Input
              prefix={<PhoneOutlined className="site-form-item-icon" />}
              placeholder="Phone Number"
              disabled
              style={{ color: "white" }}
            />
          </Form.Item>

          <Form.Item>
            <Button style={{ color: "white", borderColor: "white" }} type="text" onClick={handleTogglePasswordFields}>
              {showPasswordFields ? "Hide Change Password Form" : "Show Change Password Form"}
            </Button>
          </Form.Item>

          {showPasswordFields && (
            <>
              <Form.Item
                name="old_pass"
                label="Old Password"
                rules={[
                  {
                    required: true,
                    message: "Please input your old password!",
                  },
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  value={old_pass}
                  onChange={(event) => setOldPassword(event.target.value)}
                  placeholder="Old Password"
                />
              </Form.Item>

              <Form.Item
                name="new_pass"
                label="New Password"
                rules={[
                  {
                    required: true,
                    message: "Please input your new password!",
                  },
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  value={new_pass}
                  onChange={(event) => setNewPassword(event.target.value)}
                  placeholder="New Password"
                />
              </Form.Item>

              <Form.Item
                name="confirmNewPassword"
                label="Re-confirm New Password"
                dependencies={["new_pass"]}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Please re-confirm your new password!",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("new_pass") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error("The two passwords do not match!")
                      );
                    },
                  }),
                ]}
              >
                <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} placeholder="Re-confirm New Password" />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  onClick={onFinishChangePassword}
                >
                  Change Password
                </Button>
              </Form.Item>
            </>
          )}
        </Form>
        <HistoryTable/>
      </Space>
      ) : (
        <></>
        )}
    </div>
  );
}

export default Profile;
