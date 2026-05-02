import { Link, useLocation } from "react-router";
import searchIcon from "../../../../../public/search.png";
import bell from "../../../../../public/bell.png";
import user from "../../../../../public/user.png";

const navs = [
  {
    title: "Browse",
    link: "/browser",
  },
  {
    title: "Movie",
    link: "/movie",
  },
  {
    title: "TV Shows",
    link: "/tv-shows",
  },
  {
    title: "My List",
    link: "/my-list",
  },
];

const Header = ({
  search,
  handleSearch,
  setSearch,
}: {
  search: string;
  setSearch: (search: string) => void;
  handleSearch: () => Promise<void>;
}) => {
  const location = useLocation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  return (
    <div className="header">
      <div>
        <h1>CHINEPHIL</h1>
      </div>
      <div className="navs-btms">
        {navs.map((nav, index) => (
          <div key={index} className="nav-btm">
            <Link
              to={nav.link}
              className={`${location.pathname === nav.link ? "highlight" : ""}`}
            >
              {nav.title}
            </Link>
            {location.pathname === nav.link && (
              <span className="nav-underline"></span>
            )}
          </div>
        ))}
      </div>
      <div className="search">
        <img src={searchIcon} alt="" width={20} />
        <input
          type="text"
          onChange={handleChange}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
          value={search}
          placeholder="Search for movies, acrotrs, or directors..."
        />
      </div>
      <div className="notify-profile">
        <div>
          <img src={bell} alt="notify" width={20} />
        </div>
        <div>
          <img src={user} alt="user" width={20} />
        </div>
      </div>
    </div>
  );
};

export default Header;
