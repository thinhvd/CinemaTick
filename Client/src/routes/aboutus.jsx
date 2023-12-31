import Layout, { Content, Footer, Header } from "antd/es/layout/layout.js";
import TopBar from "../components/topbar";
import FooterArea from '../components/footer';
import { Space, Typography, Image } from "antd";

const {Title, Paragraph} = Typography;

export default function Cinematick() {
  return (
    <Layout className="background">
        <div><TopBar /></div>
        <Content className='aboutcinematick'>
            <Title level={1} style={{color:'white', display:'flex', alignItems:'center',justifyContent:'center'}}>
                CINEMATICK
            </Title>
            <Space style={{display:'flex', justifyContent:'space-around', alignItems:'flex-start', columnGap:'1vw'}} direction='horizontal'>
                <Space className='contact' direction='vertical' style={{}}>
                    
                    <Space direction='vertical' style={{alignSelf:'flex-start !important'}}>
                        <Title level={3} style={{color:'white'}}>
                            Mô tả
                        </Title>
                        <Paragraph style={{color:'white'}}>
                            <strong>Website đặt vé xem phim được tạo từ năm 2023 bởi 4 bạn sinh viên Vũ Đức Thịnh, Trịnh Quốc Đạt,<br/> 
                                Nguyễn Lê Minh, Hoàng Vũ Anh. Với mong muốn đạt được điểm A+, 4 bạn sinh viên đã nỗ lực <br/>
                                ngày qua ngày để làm và hoàn thiện website giúp mọi người đặt và mua vé xem phim dễ dàng</strong>
                        </Paragraph>

                    </Space>
                    <Space direction='vertical' style={{alignSelf:'flex-start !important'}}>
                    <Title level={3} style={{color:'white'}}>
                            Thành viên
                        </Title>
                        <Paragraph style={{color:'white'}}>
                            <strong>Vũ Đức Thịnh
                            <br/>
                            Trịnh Quốc Đạt
                            <br/>
                            Nguyễn Lê Minh
                            <br/>
                            Hoàng Vũ Anh</strong>
                        </Paragraph>

                    </Space>
                    <Space direction='vertical' style={{alignSelf:'flex-start !important'}}>
                        <Title level={3} style={{color:'white'}}>
                            Thông tin liên hệ
                        </Title>
                        <Paragraph style={{color:'white'}}>
                            <strong>
                                Cơ sở: Đại học Công nghệ - Đại học Quốc gia Hà Nội
                                <br/>
                                Địa chỉ: 144 Xuẩn Thủy
                                <br/>
                                SĐT: 0965909618 (Mr.Thịnh)
                            </strong>
                        </Paragraph>
                    </Space>  
                </Space>
                <Space className='contact' direction='vertical' style={{}}>
                    <Space direction='vertical' style={{alignSelf:'flex-start !important'}}>
                        <Title level={3} style={{color:'white'}}>
                            NHÀ TÀI TRỢ
                        </Title>
                        <Paragraph style={{color:'white'}}>
                            <strong>Kèo Kafe:</strong>
                        </Paragraph>
                        <Image
                                className="logoweb"
                                src={"https://scontent.fhan5-10.fna.fbcdn.net/v/t39.30808-6/276997599_112317424757617_6953049204506381803_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=783fdb&_nc_ohc=fAjQknKEloAAX_I_vNu&_nc_ht=scontent.fhan5-10.fna&oh=00_AfAfJ2SXm6wyKG5j624zGnVxvnSX1dguypx0k9jE5CGf-A&oe=65965ECA"}
                        />
                        <Paragraph style={{color:'white'}}>
                            <strong>Oxygen Coffee:</strong>
                        </Paragraph>
                        <Image
                                className="logoweb"
                                src={"https://scontent.fhan5-6.fna.fbcdn.net/v/t39.30808-6/339159584_240898315065344_1570296131210151142_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=efb6e6&_nc_ohc=AgGHPDifAhcAX-QtrXd&_nc_ht=scontent.fhan5-6.fna&oh=00_AfCvz5yX-UVBh6UDk68oW1ttxkJ0oS9nnH8f14xuYkKXXg&oe=6596E152"}
                        />
                        <Paragraph style={{color:'white'}}>
                            <strong>Đại học Công nghệ - Đại học Quốc gia Hà Nội:</strong>
                        </Paragraph>
                        <Image
                                className="logoweb"
                                src={"https://scontent.fhan5-10.fna.fbcdn.net/v/t39.30808-6/306977255_543189674275183_7940280886638255894_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=efb6e6&_nc_ohc=t8FuNNYptGIAX-qIMoy&_nc_oc=AQmUHQ08llh6a1i7PZ8uTV8g-TIzzelRcOgXicOdipDg6adwWbrQUz60AfI9muPTz1g&_nc_ht=scontent.fhan5-10.fna&oh=00_AfCqZDi84ctrmR4tjet5ZkvGXtygzpvMPj4-2ryvnbQ7LA&oe=65964B75"}
                        />
                    </Space>
                </Space>
            </Space>
        </Content>
        <Footer className="aboutus">
            <FooterArea/>
        </Footer>
    </Layout>  
  );
}