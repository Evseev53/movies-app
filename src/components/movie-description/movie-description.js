import { Component } from 'react';
import { Col, Row } from 'antd';

import { GenresConsumer } from '../swapi-service-context/swapi-service-context';
import Rating from '../rating/rating';
import './movie-description.css';
import Genres from '../genres/genres';

export default function MovieDescription ({ title, date, genresId, rating }) {
  return(
    <div className="movie-description">
      <Row>
        <Col span={21}>
          <span className="title">{ title }</span>
          <span className="date">{ date }</span>
        </Col>
        <Col span={3}>
          <Rating rating={ rating }/>
        </Col>
      </Row>
      <GenresConsumer>
        {
          (genres) => {
            return <Genres genresId={ genresId } genres={ genres } />
          }
        }
      </GenresConsumer>
    </div>
  )
}