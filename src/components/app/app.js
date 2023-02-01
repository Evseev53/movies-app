import { Component } from "react";
import { format, parseISO } from 'date-fns';
import './app.css';
import MoviesList from "../movies-list/movies-list";
import SwapiServiсe from "../../services/swapi-service";
import { GenresProvider, RateMovieProvider } from "../swapi-service-context/swapi-service-context";
import { Spin, Alert, Input, Pagination, Tabs } from "antd";
import { debounce } from "lodash";
import ListAndPagination from "../list-and-pagination/list-and-pagination";

export default class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            movies: null,
            favoriteMovies: null,
            error: false,
            errorText: null,
            loading: true,
            request: '',
            genres: null,
            sessionId: null
        };
    }

    swapiServiсe = new SwapiServiсe();

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
    };

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
                this.setState({movies: movies})
            })
            .catch(e => this.onError(e))
    }

    getListOfFavorites = () => {
        this.swapiServiсe.getListOfFavorites(this.state.sessionId)
            .then(movies => { this.setState({favoriteMovies: movies}) })
            .catch(e => this.onError(e))
    }

    debouncedSearch = debounce( (value, page) => {
        this.searchMovies(value, page);
    }, 1000);

    onInput = (e) => {
        const request = e.target.value;
        this.setState({
            request: request,
            loading: true,
            error: false
        })
        this.debouncedSearch(request);
    }

    onPagination = (e) => {
        this.setState({
            loading: true,
            error: false
        })
        const { request } = this.state;
        this.debouncedSearch(request, e);
    }

    updateStateApp = (key, value) => {
        this.setState({
            [key]: value
        })
    }

    render() {
        const { sessionId, movies, favoriteMovies, error, errorText, loading } = this.state;
        const searchPage = (
            <div className="container">
                <div className="input-container">
                    <Input placeholder="Type to search..." onChange={this.onInput}/>
                </div>
                <ListAndPagination
                    movies={ movies }
                    onPagination={ this.onPagination }
                    error={ error }
                    errorText={ errorText }
                    loading={ loading }
                    updateStateApp={ this.updateStateApp }
                    onError={ this.onError }
                />
            </div>);

        const ratedPage = (
            <ListAndPagination
                movies={ favoriteMovies }
                onPagination={ this.onPagination }
                error={ error }
                errorText={ errorText }
                loading={ loading }
                updateStateApp={ this.updateStateApp }
                getListOfFavorites={ this.getListOfFavorites }
                onError={ this.onError }
            />
        )

        const pages = [
            {
                key: '1',
                label: `Search`,
                children: searchPage,
            },
            {
                key: '2',
                label: `Rated`,
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


