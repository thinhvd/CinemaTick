<div align="center">
  <p>
    <a href="http://fall2324w20g8.int3306.freeddns.org/" target="_blank">
      <img width="20%" src="https://github.com/thinhvd/CinemaTick/blob/main/dist/assets/Cinematick-bKhDpndx.png?raw=true" alt="logo"></a>
  </p>
</div>

# CinemaTick
Project of Web Application Development Course (INT3306E_20) - A web application that allows users to book movie tickets online.

# Group 8
Members of the group:

- **Vu Duc Thinh** - 20021444 (Group leader): Backend Developer
- **Trinh Quoc Dat** - 20021328: Backend Developer
- **Nguyen Le Minh** - 20021394: Frontend Developer
- **Hoang Vu Anh** - 20020128: Frontend Developer

# How to run
Log in to the server https://int3306.freeddns.org/

Open the terminal and execute the following commands:

```
cd CinemaTick/server/
python main.py
```

Then, open another terminal and expose the port with the following command:

```
/etc/jupyter/bin/expose 5002
```

Access the path http://fall2324w20g8.int3306.freeddns.org/ to open the website.

# Note
- The web integrates VNPAY payment gateway for transactions. However, the web application is currently using the VNPAY sandbox environment, so real transactions cannot be created (To use VNPAY with real transactions, a contract must be signed).
- To demonstrate the payment, users can test with the following test card information:

| **Ngân hàng**      |               NCB              |
|--------------------|:------------------------------:|
| **Số thẻ**         | 9704198526191432198            |
| **Tên chủ thẻ**    | NGUYEN VAN A                   |
| **Ngày phát hành** | 07/15                          |
| **Mật khẩu OTP**   | 123456                         |
