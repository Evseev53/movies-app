import './poster.css'

function Poster ({ img }) {
  return(
    <img
      className="img-card"
      alt="example"
      src={ img }
    />
  )
}

export default Poster;