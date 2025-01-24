import React, { useEffect, useState } from "react";
import styled from "styled-components";
import SearchImg from "../../Assects/search.png";

const SearchForm = styled.input`
  border: 1px solid rgba(111, 0, 163, 0.5);
  border-radius: 5px;
  background-color: #f9f9f9;
  background-image: url(${SearchImg}); /* Path to your image */
  background-repeat: no-repeat;
  background-position: 95% center; /* Position the image inside the input */
  background-size: 30px 30px; /* Set the size of the image */
  margin: 1% 0.5%;
  width: 13.15%;
  height: 35px;
  position: absolute;
  padding-left: 10px; /* Adds 10px of space at the start of the input */

  &:hover {
    background-color: rgb(220, 198, 247);
  }
`;

const SearchSMS = ({ searchHint }) => {
  const [inputValue, setInputValue] = useState("");
  const [debouncedValue, setDebouncedValue] = useState("");

  // Timer to handle debouncing
  useEffect(
    () => {
      const timer = setTimeout(() => {
        setDebouncedValue(inputValue); // Call the function with the debounced value
      }, 200); // 0.5s delay

      // Cleanup the timer if input changes before the 0.5s
      return () => {
        clearTimeout(timer);
      };
    },
    [inputValue]
  ); // The effect runs every time `inputValue` changes

  // Function to be called after 0.5s of inactivity
  const handleDebouncedFunction = () => {
    searchHint(debouncedValue);
  };

  // Trigger the function when the debounced value changes
  useEffect(
    () => {
      handleDebouncedFunction();
    },
    [debouncedValue]
  );

  return (
    <div>
      <SearchForm
        type="text"
        value={inputValue}
        onChange={e => setInputValue(e.target.value)}
        placeholder=" Search here..."
      />
    </div>
  );
};

export default SearchSMS;
