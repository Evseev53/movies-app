import './rating.css'

export default function Rating ({ rating }) {
  const value = rating;
  let color;
  if (value < 3) {
    color = '#E90000';
  } else if (value >= 3 && value < 5) {
    color = '#E97E00';
  } else if (value >= 5 && value < 7) {
    color = '#E9D100';
  } else {
    color = '#66E900';
  }

  const borderStyle = { borderColor: color };

  return(
    <div className="rating" style={ borderStyle }>
      <span className="rating-value">{ value.toFixed(1) }</span>
    </div>
  )
}