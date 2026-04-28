type Props = {
  city: string;
  setCity: (value: string) => void;
  handleSubmit: () => void;
};

const SearchForm = ({ city, setCity, handleSubmit }: Props) => {
  return (
    <div>
      <label>Search:</label>
      <input
        type="text"
        placeholder="Enter Your city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default SearchForm;
