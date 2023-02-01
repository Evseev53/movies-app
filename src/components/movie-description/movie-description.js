import { Component } from "react";
import {Card, Col, Rate, Row, Typography} from "antd";
import { GenresConsumer } from "../swapi-service-context/swapi-service-context";
import Rating from "../rating/rating";
import './movie-description.css';
import Genres from "../genres/genres";

const { Meta } = Card;
const { Text } = Typography;


export default class MovieDescription extends Component {
    onChangeRate = (e) => {
        const { rateMovie, id } = this.props;
        rateMovie(id, e).then(result => console.log(result))
    }

    render() {
        const { title, date, genresId, description, rating, myRating } = this.props;
        return(
            <div className="movie-description">
                <Row>
                    <Col span={21}>
                        <Meta
                            title={ title }
                            description={ date }
                        />
                    </Col>
                    <Col span={3}>
                        <Rating rating={ rating }/>
                    </Col>
                </Row>
                <GenresConsumer>
                    {
                        (genres) => {
                            return <Genres genresId={genresId} genres={genres} />
                        }
                    }
                </GenresConsumer>
                <Text className="description">
                    { description }
                </Text>
                <Rate
                    className="rate"
                    onChange={this.onChangeRate}
                    defaultValue={myRating}
                    count={ 10 }
                    allowHalf
                />
            </div>
        )
    }
}