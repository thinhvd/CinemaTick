import Layout, { Content, Footer, Header } from "antd/es/layout/layout.js";
import TopBar from "../components/topbar";
import FooterArea from '../components/footer';
import { Space, Typography, Image } from "antd";

const {Title, Paragraph} = Typography;

export default function Service() {
  return (
    <Layout className="background">
        <div><TopBar /></div>
        <Content className='aboutcinematick'>
            <Title level={1} style={{color:'white', display:'flex', alignItems:'center',justifyContent:'center'}}>
                DỊCH VỤ QUẢNG CÁO
            </Title>
            <Space style={{display:'flex', justifyContent:'space-around', alignItems:'flex-start', columnGap:'1vw'}} direction='horizontal'>
                <Space className='contact' direction='vertical' style={{}}>
                <Space direction='vertical' style={{alignSelf:'flex-start !important'}}>
                        <Title level={3} style={{color:'white'}}>
                            ĐẠI HỌC CÔNG NGHỆ - ĐẠI HỌC QUỐC GIA
                        </Title>
                        <Paragraph style={{color:'white'}}>
                            <strong>
                            Trường Đại học Công nghệ, Đại học Quốc gia Hà Nội được thành lập <br/> theo Quyết định số 92/2004/QĐ-TTg ngày 25/05/2004 của Thủ tướng <br/> Chính phủ trên cơ sở Khoa Công nghệ và Trung tâm Hợp tác Đào tạo <br/> và Bồi dưỡng Cơ học trực thuộc Đại học Quốc gia Hà Nội
                            </strong>
                        </Paragraph>
                    </Space>
                    <Space direction='vertical' style={{alignSelf:'flex-start !important'}}>
                        <Title level={3} style={{color:'white'}}>
                            KÈO KAFE
                        </Title>
                        <Paragraph style={{color:'white'}}>
                            <strong>Địa chỉ: 58 P.Yên Lãng, Láng Hạ, Đống Đa, Hà Nội<br/>
                            Điện thoại: 0941 989 686</strong>
                        </Paragraph>

                    </Space>
                    <Space direction='vertical' style={{alignSelf:'flex-start !important'}}>
                    <Title level={3} style={{color:'white'}}>
                            OXYGEN COFFEE
                        </Title>
                        <Paragraph style={{color:'white'}}>
                            <strong>Không gian độc đáo - Cà phê hảo hạng
                            <br/><br/>
                            Địa chỉ: 71 P. Trần Quốc Vượng, Dịch Vọng Hậu, Cầu Giấy, Hà Nội <br/>
                            Điện thoại: 0888 065 365</strong>
                        </Paragraph>

                    </Space>
                </Space>
                <Space className='contact' direction='vertical' style={{}}>
                    <Space direction='vertical' style={{alignSelf:'flex-start !important'}}>
                        <Title level={3} style={{color:'white'}}>
                            NHÀ TÀI TRỢ
                        </Title>
                        <Paragraph style={{color:'white'}}>
                            <strong>Đại học Công nghệ - Đại học Quốc gia Hà Nội:</strong>
                        </Paragraph>
                        <Image
                                className="logoweb"
                                src={"https://scontent.fhan5-10.fna.fbcdn.net/v/t39.30808-6/306977255_543189674275183_7940280886638255894_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=efb6e6&_nc_ohc=t8FuNNYptGIAX-qIMoy&_nc_oc=AQmUHQ08llh6a1i7PZ8uTV8g-TIzzelRcOgXicOdipDg6adwWbrQUz60AfI9muPTz1g&_nc_ht=scontent.fhan5-10.fna&oh=00_AfCqZDi84ctrmR4tjet5ZkvGXtygzpvMPj4-2ryvnbQ7LA&oe=65964B75"}
                        />
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