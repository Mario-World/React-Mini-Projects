import { useState } from "react";

function App() {
  const [dictionary] = useState([
    { word: "React", meaning: "A JavaScript library for building user interfaces." },
    { word: "Component", meaning: "A reusable building block in React." },
    { word: "State", meaning: "An object that stores data for a component." }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [result, setResult] = useState("");

  const handleSearch = () => {
    if (!searchTerm.trim()) {
      setResult(""); 
      return;
    }

    const found = dictionary.find(
      (item) => item.word.toLowerCase() === searchTerm.toLowerCase()
    );

    if (found) {
      setResult(found.meaning);
    } else {
      setResult("Word not found in the dictionary.");
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>XDictionary</h1>

      <input
        type="text"
        placeholder="Search for a word..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          padding: "8px",
          width: "250px",
          marginRight: "10px"
        }}
      />

      <button 
        onClick={handleSearch}
        style={{ padding: "8px 16px", cursor: "pointer" }}
      >
        Search
      </button>

      {/* Display Result */}
      <div style={{ marginTop: "20px" }}>
        {result && result !== "Word not found in the dictionary." ? (
          <>
            <h3>Definition:</h3>
            <p>{result}</p>
          </>
        ) : result === "Word not found in the dictionary." ? (
          <p>{result}</p>
        ) : null}
      </div>
    </div>
  );
}

export default App;
