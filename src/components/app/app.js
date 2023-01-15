import { Component } from "react";
import { format, parseISO } from 'date-fns';
import './app.css';
import MoviesList from "../movies-list/movies-list";
import SwapiServiсe from "../../services/swapi-service";
import { Spin, Alert, Input, Pagination } from "antd";
import { debounce } from "lodash";

export default class App extends Component{

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loading: true,
            error: false,
            errorText: null,
            request: ''
        };
    }

    swapiServiсe = new SwapiServiсe();

    urlImages = 'https://image.tmdb.org/t/p/original/';

    formatDate(date) {
        try {
            return format(parseISO(date), "MMMM d',' yyyy");
        } catch {
            return 'No Date';
        }
    }

    reduceText(text, value) {
        const afterSlice = text.slice(0, value);
        const afterSplit = afterSlice.split(' ');
        afterSplit.pop();
        return afterSplit.join(' ') + ' ...';
    }

    onError(err) {
        console.error('onError:', err);
        this.setState({
                loading: false,
                error: true,
                errorText: err.message
            }
        )
    }

    searchMovies(value, page) {
        this.swapiServiсe
            .getMovies(value, page)
            .then(movies => {
                if (!movies.results.length) {
                    throw Error('Фильм не найден');
                }
                this.setState({data: []});
                movies.results.forEach( movie => {
                this.setState((state) => {
                    const { data } = state;
                    const description = this.reduceText(movie.overview, 200);
                    const date = this.formatDate(movie.release_date);
                    return {
                        data: [
                            ...data,
                            {
                                title: movie.original_title,
                                date: date,
                                genre: 'undefined',
                                description: description,
                                rating: movie.vote_average,
                                img: this.urlImages + movie.poster_path,
                                id: movie.id
                            }
                        ],
                        loading: false,
                        error: false
                    }
                })
            })
            }).catch(this.onError.bind(this))
    }

    debouncedSearch = debounce( (value, page) => {
        this.searchMovies(value, page);
    }, 1000);

    onInput = (e) => {
        const request = e.target.value;
        this.setState({request: request})
        this.debouncedSearch(request);
    }

    onPagination = (e) => {
        const { request } = this.state;
        this.debouncedSearch(request, e);
    }

    render() {
        const { data, loading, error } = this.state;
        const hadData = !(loading || error);

        const errorMessage = error ?
            <Alert
                message="Ой!"
                description={ this.state.errorText }
                type="error"
                className="error-alert"
            />
            : null;

        const pagination = hadData ? <Pagination defaultCurrent={1} total={50} onChange={ this.onPagination }/> : null;

        const content = hadData ? <MoviesList data = { data }/> : null;
        const spin = loading ? <Spin tip="Loading" size="large" className="loading"/> : null;

        return (
            <div className="container">
                <div className="input-container">
                    <Input placeholder="Type to search..." onChange={this.onInput}/>
                </div>
                <div className="movies-container">
                    { content }
                    { spin }
                    { errorMessage }
                </div>
                <div className="pagination-container">
                    { pagination }
                </div>
            </div>
        );
    }
}


