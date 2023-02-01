function Poster ({ img }) {
    return(
        <img
            className="img-card"
            alt="example"
            src={ img }
            style={{borderRadius: 0, width: 183, height: 281}}
        />
        )
}

export default Poster;