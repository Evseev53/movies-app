import {Component} from 'react';
import { Rate, Typography } from 'antd';

import Poster from '../poster/poster';
import './movie.css';
import MovieDescription from '../movie-description/movie-description';

const { Text } = Typography;

export default class Movie extends Component {
  onChangeRate = (e) => {
    const { rateMovie, setRatingAndId } = this.props;
    const { id } = this.props.data;
    rateMovie(id, e);
    setRatingAndId(id, e);
  }

  render() {

    const { title, date, genresId, description, img, rating, id, myRating } = this.props.data;
    return(
      <div
        className="card"
      >
        <div className="img-container">
          <Poster img={ img } />
        </div>
        <div className="card-content">
          <MovieDescription
            title={ title }
            date={ date }
            genresId={ genresId }
            rating={ rating }
            id={ id }
          />
        </div>
        <Text className="description">
          { description }
        </Text>
        <Rate
          className="rate"
          onChange={this.onChangeRate}
          defaultValue={ myRating }
          count={ 10 }
          allowHalf
        />
      </div>
    )
  }
}
