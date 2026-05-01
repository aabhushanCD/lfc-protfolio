import search from "../../../../../public/search.png";

type Props = {
  city: string;
  setCity: (value: string) => void;
  handleSubmit: () => void;
};

const SearchForm = ({ city, setCity, handleSubmit }: Props) => {
  return (
    <div className="search-box">
      <img src={search} alt="Search" width={20} height={20} />
      <input
        type="text"
        placeholder="Enter Your city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSubmit();
          }
        }}
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default SearchForm;
