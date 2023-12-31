import {Button, Space, Dropdown } from "antd";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function UserButton() {
    const token = localStorage.getItem('token');
    const isLoggedIn = !!token; // Kiểm tra xem token có tồn tại không
    const navigate = useNavigate();

    // Thêm biến state để theo dõi việc đăng nhập
    const [user, setUser] = useState([]);

    // Hàm để lấy thông tin người dùng khi có token
    function getUserInfo(){
        axios({
            method: "GET",
            url:"http://fall2324w20g8.int3306.freeddns.org/api/profile",
            headers: {
              Authorization: 'Bearer ' + token
            }
        })
        .then((response) => {
            if (response.status >= 200 && response.status < 300) {
                const userData = response.data;
                setUser(userData);
                // console.log(userData);
            } else {
                setUser(null);
                console.log("User not available");
            }
        })
        
        .catch(error => {
            console.error(error);
        });
    };

    const Logout = () => {
        localStorage.removeItem('token');
        navigate('/');
    }
    
    useEffect(() => {
        if (isLoggedIn) {
            getUserInfo();
        }
        // console.log(token)
    }, [isLoggedIn]);

    const items = [
        {
          key: '1',
          label: (
            <Link to={`/profile`}>THÔNG TIN CÁ NHÂN</Link>
          ),
        },
        {
          key: '2',
          label: (
            <a target="" rel="" onClick={() => Logout()}>
              ĐĂNG XUẤT
            </a>
          ),
        },
      ];

    return (
        <>
            {isLoggedIn ? (
                // Hiển thị thanh hiển thị tên và avatar\
                <Dropdown
                    style={{
                        display:'flex',

                    }}
                    menu={{
                        items,
                    }}
                >
                    <Button 
                        style={{
                            width:'40%',
                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                            color:'#fff',
                            padding:'0',
                            borderRadius:'none',
                        }}
                    >
                        <div>{user.fullname}</div>
                    </Button>
                </Dropdown>
            ) : (
                // Hiển thị nút "Log in" và "Sign up"
                <Space size='middle'>
                    <Button className="buttonstyle" href={`/login`}>
                        Log in
                    </Button>
                    <Button className="buttonstyle" href={`/signup`}>
                        Sign up
                    </Button>
                </Space>
            )}
        </>
    )
}
