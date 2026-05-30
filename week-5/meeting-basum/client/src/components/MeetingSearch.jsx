import { useState } from "react";

const MeetingSearch = () => {
  const [searchText, setSearchText] = useState("");

  return (
    <input value={searchText} onChange={(e) => setSearchText(e.target.value)} />
  );
};

export default MeetingSearch;
