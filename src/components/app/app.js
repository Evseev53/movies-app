import { Component } from "react";
import { format, parseISO } from 'date-fns';
import './app.css';
import MoviesList from "../movies-list/movies-list";
import SwapiServiсe from "../../services/swapi-service";
import { Spin, Alert } from "antd";

export default class App extends Component{

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loading: true,
            error: false,
            errorText: null
        };
        this.searchMovies();
    }

    swapiServiсe = new SwapiServiсe();

    urlImages = 'https://image.tmdb.org/t/p/original/';

    formatDate(date) {
        return format(parseISO(date), "MMMM d',' yyyy");
    }

    reduceText(text, value) {
        const afterSlice = text.slice(0, value);
        const afterSplit = afterSlice.split(' ');
        afterSplit.pop();
        return afterSplit.join(' ') + ' ...';
    }

    onError(err) {
        console.error('onError:', err);
        console.log(this.state);
        this.setState({
                loading: false,
                error: true,
                errorText: err.message
            }
        )
    }

    searchMovies() {
        this.swapiServiсe
            .getMovies('back')
            .then(movies => {
                if (!movies.results.length) {
                    throw Error('Фильм не найден');
                }
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

    render() {
        const { data, loading, error } = this.state;
        const hadData = !(loading || error);

        const errorMessage = error ?
            <Alert
                message="Что-то пошло не так:"
                description={ this.state.errorText }
                type="error"
                closable
            />
            : null;

        const content = hadData ? <MoviesList data = { data }/> : null;
        const spin = loading ? <Spin tip="Loading" size="large" className="loading"/> : null;

        return (
            <div>
                { content }
                { spin }
                { errorMessage }
            </div>
        );
    }
}


