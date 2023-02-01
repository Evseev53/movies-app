import {Component} from "react";
import {RateMovieConsumer} from "../swapi-service-context/swapi-service-context";
import Poster from "../poster/poster";
import './movie.css';
import { Card, Col, Row } from 'antd';
import MovieDescription from "../movie-description/movie-description";

export default class Movie extends Component {

    render() {

        const { title, date, genresId, description, img, rating, id, myRating } = this.props.data;

        const cardStyle = {
            width: 480,
            height: 281,
            borderRadius: 0
        };

        return(
            <Card
                className="card"
                hoverable
                bordered={false}
                style={ cardStyle }
            >
                <Row>
                    <Col span={11} className="grid-img">
                        <Poster img={ img } />
                    </Col>
                    <Col span={13} className="grid-content">
                        <RateMovieConsumer>
                            {
                                (rateMovie) => {
                                    return (
                                        <MovieDescription
                                            title={title}
                                            date={date}
                                            genresId={genresId}
                                            description={description}
                                            rating={rating}
                                            rateMovie={rateMovie}
                                            id={id}
                                            myRating={myRating}
                                        />
                                    )
                                }
                            }
                        </RateMovieConsumer>
                    </Col>
                </Row>
            </Card>
        )
    }
}
