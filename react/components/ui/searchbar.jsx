/*
 * SearchBar - A search field component with input handling
 */
export const SearchBar = ({ onSearch }) => {
  return (
    <input
      type="text"
      placeholder="Sök..."
      className="border p-2 rounded w-full"
      onChange={(e) => onSearch(e.target.value)}
    />
  );
};