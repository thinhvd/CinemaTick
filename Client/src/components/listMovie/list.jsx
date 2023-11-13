import { Card } from 'antd';
import './list.css';

const { Meta } = Card;


const List = () => {
    return(
        <div style={{display: 'flex', gap: '128px', margin:'0 100px'}}>
            <Card 
                hoverable
                className='cardStyle'
                cover={<img alt="1" src = "src/images/listMovie/1.jpg"/>}>
                <Meta
                    title={<div style={{ color: 'white' }}>Avenger:End game</div>}
            />
            </Card>


            <Card 
                hoverable
                className='cardStyle'
                cover={<img alt="1" src = "src/images/listMovie/1.jpg"/>}>
                <Meta
                    title={<div style={{ color: 'white' }}>Avenger:End game</div>}
            />
            </Card>

            <Card 
                hoverable
                className='cardStyle'
                cover={<img alt="1" src = "src/images/listMovie/1.jpg"/>}>
                <Meta
                    title={<div style={{ color: 'white' }}>Avenger:End game</div>}
            />
            </Card>

            <Card 
                hoverable
                className='cardStyle'
                cover={<img alt="1" src = "src/images/listMovie/1.jpg"/>}>
                <Meta
                    title={<div style={{ color: 'white' }}>Avenger:End game</div>}
            />
            </Card>
        </div>
    )
}

export default List;


