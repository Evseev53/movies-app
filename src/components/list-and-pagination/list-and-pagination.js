import { Component } from 'react';
import { Alert, Pagination, Spin } from 'antd';
import { format, parseISO } from 'date-fns';

import MoviesList from '../movies-list/movies-list';
import './list-and-pagination.css';

export default class ListAndPagination extends Component{
  state = {
    data: [],
    page: 1
  };

  urlImages = 'https://image.tmdb.org/t/p/original/';

  componentDidMount() {
    const { movies, getListOfFavorites } = this.props;
    if (movies) {
      this.createCardList(movies);
    }
    if (getListOfFavorites) {
      getListOfFavorites()
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.movies !== prevProps.movies && this.props.movies) {
      this.createCardList(this.props.movies);
    }
  }

  formatDate = (date) => {
    try {
      return format(parseISO(date), 'MMMM d\',\' yyyy');
    } catch {
      return 'No Date';
    }
  }

  reduceText = (text, value) => {
    if (text.length > value) {
      const afterSlice = text.slice(0, value);
      const afterSplit = afterSlice.split(' ');
      afterSplit.pop();
      return `${afterSplit.join(' ')  } ...`;
    } 
    return text;
        
  }

  createCardList = (movies) => {
    try {
      if (!movies.results.length) {
        throw Error('Фильм не найден');
      }
      this.setState({
        data: [],
        page: movies.page,
        total: movies.total_results
      });
      movies.results.forEach( movie => {
        this.setState((state) => {
          const { data } = state;
          const { getRatingById } = this.props;
          const description = this.reduceText(movie.overview, 230);
          const date = this.formatDate(movie.release_date);
          const title = this.reduceText(movie.original_title, 30);
          const rating = getRatingById(movie.id);
          return {
            data: [
              ...data,
              {
                title,
                date,
                genresId: movie.genre_ids,
                description,
                rating: movie.vote_average,
                img: movie.poster_path === null
                  ? 'https://kharkivmebel.com/upload/iblock/fa9/5g7javca9w0ak62rupuq3nnd3dx3dufi.png'
                  : this.urlImages + movie.poster_path,
                id: movie.id,
                myRating: rating
              }
            ],
          }
        })
      })
      this.props.updateStateApp('loading', false);
      this.props.updateStateApp('error', false);
    } catch (e) {
      const { onError } = this.props;
      onError(e);
    }
  }

  render() {
    const { data, page, total } = this.state;
    const { error, errorText, onPagination, loading, isMobile, setRatingAndId } = this.props;
    const hasData = !(loading || error);

    const errorMessage = error ?
      <Alert
        message="Ой!"
        description={ errorText }
        type="error"
        className="error-alert"
      />
      : null;

    const pagination = hasData ?
      <Pagination
        defaultCurrent={ page }
        current={ page }
        total={ total }
        onChange={ onPagination }
        defaultPageSize={ 20 }
      />
      : null;

    const content = hasData ? 
      <MoviesList
        data = { data }
        isMobile={ isMobile }
        setRatingAndId={ setRatingAndId }
      /> : null;
    const spin = loading ? <Spin tip="Loading" size="large" className="loading"/> : null;

    return (
      <div>
        <div className="movies-container">
          { content }
          { spin }
          { errorMessage }
          <div className="pagination-container">
            { pagination }
          </div>
        </div>
      </div>
    )
  }
}