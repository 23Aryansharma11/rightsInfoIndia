import "./search.css";
import { useState, useEffect } from "react";
import { search } from "../../consts";

const Search = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [showNoResults, setShowNoResults] = useState(false);

  // Function to handle the search logic
  const handleSearch = (value) => {
    if (searchTimeout) clearTimeout(searchTimeout);

    setSearchTimeout(
      setTimeout(() => {
        const filteredResults = search.filter((item) =>
          item.title.toLowerCase().includes(value.toLowerCase())
        );
        setResults(filteredResults);
        setShowNoResults(filteredResults.length === 0);
      }, 1000) // 1 second delay
    );
  };

  // Effect to update search results
  useEffect(() => {
    if (query.trim() === "") {
      setResults([]);
      setShowNoResults(false);
    } else {
      handleSearch(query);
    }
  }, [query]);

  // Handle redirect
  const handleRedirect = (slug) => {
    return;
  };

  return (
    <div className="search-box">
      <section className="search">
        <input
          type="search"
          placeholder="Search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          width="20"
          height="20"
          viewBox="0 0 30 30"
        >
          <path d="M 13 3 C 7.4889971 3 3 7.4889971 3 13 C 3 18.511003 7.4889971 23 13 23 C 15.396508 23 17.597385 22.148986 19.322266 20.736328 L 25.292969 26.707031 A 1.0001 1.0001 0 1 0 26.707031 25.292969 L 20.736328 19.322266 C 22.148986 17.597385 23 15.396508 23 13 C 23 7.4889971 18.511003 3 13 3 z M 13 5 C 17.430123 5 21 8.5698774 21 13 C 21 17.430123 17.430123 21 13 21 C 8.5698774 21 5 17.430123 5 13 C 5 8.5698774 8.5698774 5 13 5 z"></path>
        </svg>
      </section>
      <div className={` search-results ${!query && "hide"}`}>
        <ul>
          {results.map((result) => (
            <a href={`/blog/${result.slug}`}>
              <li key={result.slug}>{result.title}</li>
            </a>
          ))}
        </ul>
        {showNoResults && (
          <div className="no-results">
            No such blog exists you reach out and request for the topic
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
