import { Component } from "react";
import './movies-list.css';
import Movie from "../movie/movie";
import { List } from 'antd';

export default class MoviesList extends Component {

    render() {
        const { data } = this.props;

        return(
            <List
                grid={{
                    column: 2,
                    gutter: [37]
                }}
                dataSource={ data }
                renderItem={(item) => (
                    <List.Item>
                        <Movie data={item}/>
                    </List.Item>
                )}
            />
        )
    }
}