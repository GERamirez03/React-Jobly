import React, { useState } from "react";

/** 
 * A controlled form component which renders a search form, handles changes,
 * and handles submission to search for a specific term using the search
 * function passed down from either JobList or CompanyList.
 */

function SearchForm({ search }) {
  const [term, setTerm] = useState("");

  function handleChange(evt) {
    setTerm(evt.target.value);
  };

  function handleSubmit(evt) {
    evt.preventDefault();
    search(term);
    // setTerm(""); Keep search term visible for user to reference their search!
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