// Component for search bar

const Search = ({ country, handleSearchChange }) => {
  return (
    <form>
      <label>
        Find countries:
        <input type="text" value={country} onChange={handleSearchChange} />
      </label>
    </form>
  );
};

export default Search