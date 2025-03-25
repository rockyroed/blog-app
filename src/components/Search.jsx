import SearchIcon from "./SearchIcon";

const Search = () => {
  return (
    <div className="bg-gray-100 p-2 rounded-full flex items-center gap-2">
      <SearchIcon />
      <input type="text" placeholder="Search a post..." className="bg-transparent focus:outline-none" />
    </div>
  );
};

export default Search;
