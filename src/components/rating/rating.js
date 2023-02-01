import { Component } from "react";
import './rating.css'

export default class Rating extends Component {
    render() {
        const { rating } = this.props;
        let color;
        if (rating < 3) {
            color = '#E90000';
        } else if (rating >= 3 && rating < 5) {
            color = '#E97E00';
        } else if (rating >= 5 && rating < 7) {
            color = '#E9D100';
        } else {
            color = '#66E900';
        }

        const borderStyle = {borderColor: color};

        return(
            <div className="rating" style={borderStyle}>
                <span className="rating-value">{ rating.toFixed(1) }</span>
            </div>
        )
    }
}