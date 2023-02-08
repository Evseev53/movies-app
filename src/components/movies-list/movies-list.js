import './movies-list.css';
import { List } from 'antd';

import Movie from '../movie/movie';
import { RateMovieConsumer } from '../swapi-service-context/swapi-service-context';

export default function MoviesList ({ data, isMobile, setRatingAndId }) {
  return(
    <List
      grid={{
        column: isMobile ? 1 : 2,
        gutter: [37]
      }}
      dataSource={ data }
      renderItem={(item) => (
        <List.Item>
          <RateMovieConsumer>
            {
              (rateMovie) => {
                return (
                  <Movie
                    data={ item }
                    rateMovie={ rateMovie }
                    setRatingAndId={ setRatingAndId }
                  />
                )
              }
            }
          </RateMovieConsumer>
        </List.Item>
      )}
    />
  )
}