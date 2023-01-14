import {Component} from "react";
import './movie.css';
import { Avatar, Card, Descriptions, Image, Col, Row, Typography } from 'antd';
const { Meta } = Card;
const { Text } = Typography;

export default class Movie extends Component {

    render() {

        const { title, date, genre, description, img } = this.props.data;

        const cardStyle = {
            width: 454,
            height: 281,
            borderRadius: 0
        };

        return(
            <Card
                className="card"
                hoverable
                bordered={false}
                style={ cardStyle }
                cover={
                    <img
                        alt="example"
                        src={ img }
                        style={{borderRadius: 0, width: 183, height: 281}}
                    />
                }
            >
                <Meta
                    className="meta"
                    title={ title }
                    description={ date }
                />
                <div className="genre">
                    <Text className="text-genre">
                        { genre }
                    </Text>
                </div>
                <Text className="description">
                    { description }
                </Text>
            </Card>
        )
    }
}
