import React, { useState } from "react";

/** Search Form for companies or jobs. */

function SearchForm({ search }) {
  const [term, setTerm] = useState("");

  function handleChange(evt) {
    setTerm(evt.target.value);
  };

  function handleSubmit(evt) {
    evt.preventDefault();
    search(term);
    // setTerm("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="term">Search by Key Term: </label>
      <input
        id="term"
        name="term" 
        value={term} 
        onChange={handleChange}
        placeholder="Enter search term here&hellip;" />
      <button>Search</button>
    </form>
  );
};

export default SearchForm;