import React, { useState } from "react";
import axios from "axios";

const SearchBar = () => {
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);

    const fetchSuggestions = async (input) => {
        setQuery(input);
        if (input.length > 0) {
            try {
                const response = await axios.get(`http://localhost:5000/autocomplete?query=${input}`);
                console.log("API Response:", response.data);  // Debugging Log
                setSuggestions(response.data);
            } catch (error) {
                console.error("Error fetching suggestions:", error);
                setSuggestions([]);
            }
        } else {
            setSuggestions([]);
        }
    };

    return (
        <div>
            <input
                type="text"
                value={query}
                onChange={(e) => fetchSuggestions(e.target.value)}
                placeholder="Search..."
                style={{ padding: "10px", width: "300px", borderRadius: "5px" }}
            />
            <ul style={{ listStyle: "none", padding: 0 }}>
                {suggestions.length > 0 ? (
                    suggestions.map((s, index) => (
                        <li key={index} style={{ padding: "5px", borderBottom: "1px solid #ddd" }}>
                            {s}
                        </li>
                    ))
                ) : (
                    query.length > 0 && <li>No suggestions found</li>
                )}
            </ul>
        </div>
    );
};

export default SearchBar;
