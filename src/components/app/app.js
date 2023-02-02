import { Component } from 'react';
import './app.css';
import { Input, Tabs } from 'antd';
import { debounce } from 'lodash';

import SwapiServiсe from '../../services/swapi-service';
import { GenresProvider, RateMovieProvider } from '../swapi-service-context/swapi-service-context';
import ListAndPagination from '../list-and-pagination/list-and-pagination';

export default class App extends Component {

  state = {
    movies: null,
    favoriteMovies: null,
    error: true,
    errorText: 'Введите название фильма',
    loading: false,
    request: '',
    genres: null,
    sessionId: null,
    isMobile: false
  }

  swapiServiсe = new SwapiServiсe();

  debouncedSearch = debounce( (value, page) => {
    this.searchMovies(value, page);
  }, 1000);

  componentDidMount() {
    this.swapiServiсe
      .getListOfGenres()
      .then(genres => {
        this.setState({
          genres: genres.genres
        })
      })
      .catch(e => this.onError(e))
    this.swapiServiсe
      .startGuestSession()
      .then(obj => {
        this.setState({sessionId: obj.guest_session_id})
      })
      .catch(e => this.onError(e))

    this.isMobileToggle();
    window.addEventListener('resize', this.isMobileToggle);
    window.addEventListener('offline', () => {
      this.onErrorOffline('offline')
    });
    window.addEventListener('online', () => {
      this.onErrorOffline('online')
    });
  };

  isMobileToggle = () => {
    const windowWidth = window.innerWidth;
    const {isMobile} = this.state;
    if (windowWidth < 1099 && !isMobile) {
      this.setState({
        isMobile: true
      })
    } else if (windowWidth > 1099 && isMobile) {
      this.setState({
        isMobile: false
      })
    }
  }

  onErrorOffline = (value) => {
    if (value === 'offline') {
      this.onError(new Error('Проверьте интернет соединение'))
    } else if (value === 'online') {
      this.setState({
        error: false,
        errorText: null
      })
    }
  }

  onError = (err) => {
    this.setState({
      loading: false,
      error: true,
      errorText: err.message
    })
  }

  searchMovies = (value, page) => {
    this.swapiServiсe
      .getMovies(value, page)
      .then(movies => {
        this.setState({movies})
      })
      .catch(e => this.onError(e))
  }

  getListOfFavorites = (page) => {
    this.swapiServiсe.getListOfFavorites(this.state.sessionId, page)
      .then(movies => { this.setState({favoriteMovies: movies}) })
      .catch(e => this.onError(e))
  }

  onInput = (e) => {
    const request = e.target.value;
    this.setState({
      request,
      loading: true,
      error: false
    })
    this.debouncedSearch(request);
  }

  onPagination = (e, pageName) => {
    this.setState({
      loading: true,
      error: false
    })
    if (pageName === 'search') {
      const { request } = this.state;
      this.debouncedSearch(request, e);
    } else {
      this.getListOfFavorites(e);
    }
  }

  updateStateApp = (key, value) => {
    this.setState({
      [key]: value
    })
  }

  render() {
    const { sessionId, movies, favoriteMovies, error, errorText, loading, isMobile } = this.state;

    const searchPage = (
      <div className="container">
        <div className="input-container">
          <Input placeholder="Type to search..." onChange={this.onInput}/>
        </div>
        <ListAndPagination
          movies={ movies }
          onPagination={ (e) => {this.onPagination(e, 'search')} }
          error={ error }
          errorText={ errorText }
          loading={ loading }
          updateStateApp={ this.updateStateApp }
          onError={ this.onError }
          isMobile={ isMobile }
        />
      </div>);

    const ratedPage = (
      <ListAndPagination
        movies={ favoriteMovies }
        onPagination={ (e) => {this.onPagination(e, 'rated')} }
        error={ error }
        errorText={ errorText }
        loading={ loading }
        updateStateApp={ this.updateStateApp }
        getListOfFavorites={ this.getListOfFavorites }
        onError={ this.onError }
        isMobile={ isMobile }
      />
    )

    const pages = [
      {
        key: '1',
        label: 'Search',
        children: searchPage,
      },
      {
        key: '2',
        label: 'Rated',
        children: ratedPage
      },
    ];

    return (
      <RateMovieProvider value={ (...arg) => this.swapiServiсe.rateMovie(sessionId, ...arg) }>
        <GenresProvider value={ this.state.genres }>
          <div className="container">
            <Tabs
              defaultActiveKey="1"
              items={pages}
              destroyInactiveTabPane='true'
              centered="true"
            />
          </div>
        </GenresProvider>
      </RateMovieProvider>
    );
  }
}


