import Layout, { Content, Footer, Header } from "antd/es/layout/layout.js";
import TopBar from "../components/topbar";
import FooterArea from "../components/footer";
import { Space, Typography, Image } from "antd";

const { Title, Paragraph } = Typography;

export default function Service() {
  return (
    <Layout className="background">
      <div>
        <TopBar />
      </div>
      <Content className="aboutcinematick">
        <Title
          level={1}
          style={{
            color: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          DỊCH VỤ QUẢNG CÁO
        </Title>
        <Space
          style={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "flex-start",
            columnGap: "1vw",
          }}
          direction="horizontal"
        >
          <Space className="contact" direction="vertical" style={{}}>
            <Space
              direction="vertical"
              style={{ alignSelf: "flex-start !important" }}
            >
              <Title level={3} style={{ color: "white" }}>
                ĐẠI HỌC CÔNG NGHỆ - ĐẠI HỌC QUỐC GIA
              </Title>
              <Paragraph style={{ color: "white" }}>
                <strong>
                  Trường Đại học Công nghệ, Đại học Quốc gia Hà Nội được thành
                  lập <br /> theo Quyết định số 92/2004/QĐ-TTg ngày 25/05/2004
                  của Thủ tướng <br /> Chính phủ trên cơ sở Khoa Công nghệ và
                  Trung tâm Hợp tác Đào tạo <br /> và Bồi dưỡng Cơ học trực
                  thuộc Đại học Quốc gia Hà Nội
                </strong>
              </Paragraph>
            </Space>
            <Space
              direction="vertical"
              style={{ alignSelf: "flex-start !important" }}
            >
              <Title level={3} style={{ color: "white" }}>
                KÈO KAFE
              </Title>
              <Paragraph style={{ color: "white" }}>
                <strong>
                  Địa chỉ: 58 P.Yên Lãng, Láng Hạ, Đống Đa, Hà Nội
                  <br />
                  Điện thoại: 0941 989 686
                </strong>
              </Paragraph>
            </Space>
            <Space
              direction="vertical"
              style={{ alignSelf: "flex-start !important" }}
            >
              <Title level={3} style={{ color: "white" }}>
                OXYGEN COFFEE
              </Title>
              <Paragraph style={{ color: "white" }}>
                <strong>
                  Không gian độc đáo - Cà phê hảo hạng
                  <br />
                  <br />
                  Địa chỉ: 71 P. Trần Quốc Vượng, Dịch Vọng Hậu, Cầu Giấy, Hà
                  Nội <br />
                  Điện thoại: 0888 065 365
                </strong>
              </Paragraph>
            </Space>
          </Space>
          <Space className="contact" direction="vertical" style={{}}>
            <Space
              direction="vertical"
              style={{ alignSelf: "flex-start !important" }}
            >
              <Title level={3} style={{ color: "white" }}>
                QUẢNG CÁO
              </Title>
              <Paragraph style={{ color: "white" }}>
                <strong>Đại học Công nghệ - Đại học Quốc gia Hà Nội:</strong>
              </Paragraph>
              <Image
                src={
                  "https://scontent.fhan5-10.fna.fbcdn.net/v/t39.30808-6/306977255_543189674275183_7940280886638255894_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=efb6e6&_nc_ohc=t8FuNNYptGIAX-qIMoy&_nc_oc=AQmUHQ08llh6a1i7PZ8uTV8g-TIzzelRcOgXicOdipDg6adwWbrQUz60AfI9muPTz1g&_nc_ht=scontent.fhan5-10.fna&oh=00_AfCqZDi84ctrmR4tjet5ZkvGXtygzpvMPj4-2ryvnbQ7LA&oe=65964B75"
                }
              />
              <Paragraph style={{ color: "white" }}>
                <strong>Bỏng nước miễn phí</strong>
              </Paragraph>
              <Image
                src={
                  "https://down-vn.img.susercontent.com/file/5178202fa8a147917d01aedc379736d0"
                }
              />
              <Paragraph style={{ color: "white" }}>
                <strong>Sale ô tô:</strong>
              </Paragraph>
              <Image
                src={
                  "https://autobikes.vn/stores/news_dataimages/nguyenthuy/032023/09/15/4214_Honda.jpg?rt=20230309154216"
                }
              />
            </Space>
          </Space>
        </Space>
      </Content>
      <Footer className="aboutus">
        <FooterArea />
      </Footer>
    </Layout>
  );
}
