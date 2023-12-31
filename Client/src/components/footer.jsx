import Cinematick from '../images/Cinematick.png';
import { Space, Image, Typography } from 'antd';

const { Title, Paragraph } = Typography;

export default function FooterArea(){
    return(
        <Space style={{display:'flex', justifyContent:'center', alignItems:'center'}} direction='vertical' align='center'>
            <Image
                className="logoweb"
                src={Cinematick}
                preview={false}
            />
            <Space className='contact' direction='horizontal' style={{columnGap:'10vw'}}>
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
                        Về Cinematick
                    </Title>
                    <Paragraph style={{color:'white'}}>
                        <strong>Một web làm phim tuyệt vời</strong>
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
        </Space>
    )
}