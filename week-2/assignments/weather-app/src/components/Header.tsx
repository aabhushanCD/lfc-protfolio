const Header = () => {
  return (
    <header>
      <div className="location-box">
        <img src="../../public/location.png" alt="location" width="20px" />
        <p id="location-name">Location</p>
      </div>
      <div className="search-box">
        <img src="../../public/search.png" alt="search" width="20px" />
        <input type="text" id="city-input" placeholder="Enter country name" />
        <button id="search-btm" type="submit">
          Get Weather
        </button>
      </div>
    </header>
  );
};

export default Header;
