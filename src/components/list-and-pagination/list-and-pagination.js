import { Component } from "react";
import {Alert, Pagination, Spin} from "antd";
import MoviesList from "../movies-list/movies-list";
import {format, parseISO} from "date-fns";

export default class ListAndPagination extends Component{
    state = {
        data: [],
        page: 1,
        request: '',
        genres: null,
        sessionId: null
    };

    urlImages = 'https://image.tmdb.org/t/p/original/';

    formatDate = (date) => {
        try {
            return format(parseISO(date), "MMMM d',' yyyy");
        } catch {
            return 'No Date';
        }
    }

    reduceText = (text, value) => {
        const afterSlice = text.slice(0, value);
        const afterSplit = afterSlice.split(' ');
        afterSplit.pop();
        return afterSplit.join(' ') + ' ...';
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
                    const description = this.reduceText(movie.overview, 230);
                    const date = this.formatDate(movie.release_date);
                    return {
                        data: [
                            ...data,
                            {
                                title: movie.original_title,
                                date: date,
                                genresId: movie.genre_ids,
                                description: description,
                                rating: movie.vote_average,
                                img: movie.poster_path === null
                                    ? `https://kharkivmebel.com/upload/iblock/fa9/5g7javca9w0ak62rupuq3nnd3dx3dufi.png`
                                    : this.urlImages + movie.poster_path,
                                id: movie.id,
                                myRating: movie.rating
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

    render() {
        const { data, page, total } = this.state;
        const { error, errorText, onPagination, loading } = this.props;
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
                defaultCurrent={page}
                total={total}
                onChange={ onPagination }
                defaultPageSize={20}
            />
            : null;

        const content = hasData ? <MoviesList data = { data }/> : null;
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
            </div>)
    }
}