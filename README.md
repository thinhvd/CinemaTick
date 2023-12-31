<div align="center">
  <p>
    <a href="http://fall2324w20g8.int3306.freeddns.org/" target="_blank">
      <img width="20%" src="https://github.com/thinhvd/CinemaTick/blob/main/dist/assets/Cinematick-bKhDpndx.png?raw=true" alt="logo"></a>
  </p>
</div>

# CinemaTick
Project of Web Application Development Course (INT3306E_20) - Web application that allows users to book movie tickets online.

# Group 8
Thành viên trong nhóm:

- **Vũ Đức Thịnh** - 20021444 (Nhóm trưởng): Backend Developer
- **Trịnh Quốc Đạt** - 20021328: Backend Developer
- **Nguyễn Lê Minh** - 20021394: Frontend Developer
- **Hoàng Vũ Anh** - 20020128: Frontend Developer

# How to run
Đăng nhập vào server https://int3306.freeddns.org/

Mở terminal, thực hiện các lệnh sau:
```
cd CinemaTick/server/
python main.py
```

Sau đó, mở 1 terminal khác, thực hiện expose port với lệnh sau:
```
/etc/jupyter/bin/expose 5002
```

Truy cập đường dẫn http://fall2324w20g8.int3306.freeddns.org/ để mở website


# Lưu ý
- Web tích hợp cổng thanh toán VNPAY để thanh toán. Tuy nhiên, ứng dụng Web đang sử dụng môi trường thử nghiệm (sandbox) của VNPAY nên chưa thế tạo các giao dịch thật (Để có thể sử dụng VNPAY với giao dịch thật cần phải ký kết hợp đồng).
- Để thực hiện Demo thanh toán, người dùng có thể thử nghiệm với thông tin thẻ test sau:

| **Ngân hàng**      |               NCB              |
|--------------------|:------------------------------:|
| **Số thẻ**         | 9704198526191432198            |
| **Tên chủ thẻ**    | NGUYEN VAN A                   |
| **Ngày phát hành** | 07/15                          |
| **Mật khẩu OTP**   | 123456                         |
