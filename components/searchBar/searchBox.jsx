// components/SearchBox.js
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import styles from "./searchBox.module.css";
import { BiSearch } from "react-icons/bi";

const SearchBox = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [link, setLink] = useState("");
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    const isBlockSlot = searchQuery.length === 9 && !isNaN(searchQuery);
    const isTransactionSignature = searchQuery.length === 88;
    if (isBlockSlot) {
      setLink(`/block/${searchQuery}`);
      setDropdownVisible(true);
    } else if (isTransactionSignature) {
      setLink(`/transaction/${searchQuery}`);
      setDropdownVisible(true);
    } else {
      setDropdownVisible(false);
    }
  }, [searchQuery]);

  useEffect(() => {
    // Function to handle clicks outside of the dropdown
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        inputRef.current &&
        !inputRef.current.contains(event.target)
      ) {
        setDropdownVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearch = (event) => {
    event.preventDefault();
    if (searchQuery.length === 9 || searchQuery.length === 88) {
      router.push(link);
      setSearchQuery("");
      setDropdownVisible(false);
    }
  };

  const handleDropdownClick = (event) => {
    event.preventDefault();
    router.push(link);
    setSearchQuery("");
    setDropdownVisible(false);
  };

  const handleInputFocus = () => {
    const isBlockSlot = searchQuery.length === 9 && !isNaN(searchQuery);
    const isTransactionSignature = searchQuery.length === 88;

    if (isBlockSlot || isTransactionSignature) {
      setDropdownVisible(true);
    }
  };
  return (
    <div className="container mx-auto">
      <div className={styles.SearchBox}>
        <h1>Explore Solana Blockchain</h1>
        <div className="relative">
          <form onSubmit={handleSearch} className="mb-4">
            <input
              ref={inputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={handleInputFocus}
              placeholder="Enter block slot or txn signature"
              className="border p-2 rounded"
            />
            <button
              type="submit"
              className="ml-2 px-4 py-2 bg-blue-500 text-white rounded"
            >
              <BiSearch />
            </button>
          </form>
          {dropdownVisible && (
            <div
              ref={dropdownRef}
              className="absolute bg-white border border-gray-300 rounded mt-2 w-full shadow-lg"
            >
              <a
                href={link}
                className="block px-4 py-2 text-blue-500 hover:bg-gray-100"
                onClick={handleDropdownClick}
              >
                Go to{" "}
                {searchQuery.length === 9
                  ? `Block ${searchQuery}`
                  : `Transaction ${searchQuery}`}
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchBox;
