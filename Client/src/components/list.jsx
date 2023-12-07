import { Card } from 'antd';

const { Meta } = Card;


export default function List() {
    return (
        <div style={{ display: 'flex', gap: '128px', margin: '0 100px' }}>
            <Card
                hoverable
                className='cardStyle'
                cover={<img alt="1" src="src/images/listMovie/1.jpg" />}>
                <Meta
                    title={<div className='titleStyle'>Avenger:End game</div>}
                />
            </Card>


            <Card
                hoverable
                className='cardStyle'
                cover={<img alt="1" src="src/images/listMovie/2.jpg" />}>
                <Meta
                    title={<div className='titleStyle'>Avenger:Infinity war</div>}
                />
            </Card>

            <Card
                hoverable
                className='cardStyle'
                cover={<img alt="1" src="src/images/listMovie/3.jpg" />}>
                <Meta
                    title={<div className='titleStyle'>Ironman 2</div>}
                />
            </Card>

            <Card
                hoverable
                className='cardStyle'
                cover={<img alt="1" src="src/images/listMovie/4.jpg" />}>
                <Meta
                    title={<div className='titleStyle'>Spider man: <br />Across the spiderverse</div>}
                />
            </Card>
        </div>
    )
}


