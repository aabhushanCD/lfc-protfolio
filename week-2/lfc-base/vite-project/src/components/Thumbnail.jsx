import "../css/Thumbnail.css";

const Thumbnail = ({ thumb }) => {
  return (
    <>
      <div key={thumb.key} className="thumbnail">
        {thumb.title}
      </div>
      <img src={thumb.image} alt={thumb.title} />
      <p>{thumb.description}</p>
    </>
  );
};

export default Thumbnail;
