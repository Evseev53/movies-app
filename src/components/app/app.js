import { Component } from "react";
import './app.css';
import MoviesList from "../movies-list/movies-list";
import SwapiServiсe from "../../services/swapi-service";

export default class App extends Component{
    swapiServiсe = new SwapiServiсe();

    urlImages = 'https://image.tmdb.org/t/p/original/';

    state = {
        data:
            [
                {
                    title: 'first',
                    date: null,
                    genre: null,
                    description: null,
                    rating: null,
                    img: null,
                    id: null
                }
            ]
    }

    constructor(props) {
        super(props);
        this.searchMovies();
    }


    searchMovies() {
        this.swapiServiсe
            .getMovies('return')
            .then(movies => { movies.results.forEach( movie => {
                this.setState((state) => {
                    const { data } = state;
                    console.log({...data});
                    return {
                        data: [
                            ...data,
                            {
                                title: movie.original_title,
                                date: movie.release_date,
                                genre: movie.genre_ids,
                                description: movie.overview,
                                rating: movie.vote_average,
                                img: this.urlImages + movie.poster_path,
                                id: movie.id
                            }
                        ]
                    }
                })
            })
            })
    }

    render() {
        const { data } = this.state;

        return (
            <div>
                <MoviesList data = { data }/>
            </div>
        );
    }
}


