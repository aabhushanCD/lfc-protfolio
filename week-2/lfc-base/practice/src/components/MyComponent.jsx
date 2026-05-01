import Thumbnail from "./Thumbnail";

const MyComponent = () => {
 const thumbnails = [
   {
     id: 1,
     title: "Thumbnail 1",
     image: "https://via.placeholder.com/150",
     description: "This is the first thumbnail",
   },

   {
     id: 2,
     title: "Thumbnail 2",
     image: "https://via.placeholder.com/150",
     description: "This is the second thumbnail",
   },

   {
     id: 3,
     title: "Thumbnail 3",
     image: "https://via.placeholder.com/150",
     description: "This is the third thumbnail",
   },
 ];
  return (
    <div className="thumbnailContainer">
      {thumbnails.map((thumb) => (
        <Thumbnail thumb={thumb} />
      ))}
      <div></div>
    </div>
  );
};

export default MyComponent;
