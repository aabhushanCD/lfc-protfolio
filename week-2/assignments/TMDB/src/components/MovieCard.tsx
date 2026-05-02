import play from "../../../../../public/play-button.png";

const MovieCard = ({
  imageLink,
  title,
  date,
  overview,
  rating,
}: {
  imageLink: string;
  title: string;
  date: string;
  overview: string;
  rating: number;
}) => {
  return (
    <div className="movie-card">
      <div className="movie-poster">
        <img src={imageLink} alt={title} />
        <p className="movie-rating">{rating.toFixed(1)}</p>
        <div className="play-btm">
          <img src={play} alt="Play" />
        </div>
      </div>
      <div className="movie-title">
        <span>
          <h4>
            {title.length > 20
              ? title.slice(0, 20) + "..."
              : title || "No title available"}
          </h4>
        </span>
        <span>{date ? date.slice(0, 4) : "----"}</span>
      </div>
      <p className="overview highlight">
        {overview ? overview.slice(0, 100) + "..." : "No description available"}
      </p>
    </div>
  );
};

export default MovieCard;
