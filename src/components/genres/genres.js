import React from "react";
import {Typography} from "antd";
import './genres.css';
const { Text } = Typography;

export default class Genres extends React.Component {
    state = {};

    getGenreName = (id) => {
        const { genres } = this.props;
        const names =
            genres.map(genre => {
                if (genre.id === id) {
                    return genre.name;
                }
            })
        return names;
    };

    getGenreNames = (genresId) => {
        const genreNames = genresId.map(id => this.getGenreName(id));
        return genreNames;
    }

    updateGenreList = () => {
        const { genresId } = this.props;
        const genreNames = this.getGenreNames(genresId);
        const genreList = genreNames.map((el, indx) => {
            return(
                <div className="genre" key={indx}>
                    <Text className="text-genre">
                        { el }
                    </Text>
                </div>
            )
        })
        this.setState({
            genreList: genreList
        })
    }

    componentDidMount() {
        this.updateGenreList();
    }

    componentDidUpdate(prevProps) {
        if (this.props.genresId !== prevProps.genresId) {
            this.updateGenreList();
        }
    }

    render() {
        return(
            <div>
                {this.state.genreList}
            </div>
        )
    }
};