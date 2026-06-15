import { useState } from "react";
import axios from "axios";

function SearchPage() {

  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const searchTrees = async () => {

    try {

      const response =
        await axios.get(
          `http://localhost:8080/api/trees/search?query=${query}`
        );

      setResults(response.data);

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>

      <h1 className="text-4xl font-bold mb-6">
        🔍 Search Trees
      </h1>

      <div className="flex gap-3 mb-6">

        <input
          type="text"
          placeholder="Tree Code / Species / Donor"
          value={query}
          onChange={(e) =>
            setQuery(e.target.value)
          }
          className="border p-3 rounded-lg flex-1"
        />

        <button
          onClick={searchTrees}
          className="bg-green-700 text-white px-5 rounded-lg"
        >
          Search
        </button>

      </div>

      {results.map((tree) => (

        <div
          key={tree.id}
          className="bg-white p-4 rounded-xl shadow mb-4"
        >

          <h3 className="font-bold text-lg">
            {tree.treeCode}
          </h3>

          <p>{tree.species}</p>

          <p>
            Source: {tree.source}
          </p>

        </div>

      ))}

    </div>
  );
}

export default SearchPage;