import { useState, useEffect } from "react";
import "./App.css";
import Axios from "axios";

function App() {
  const [getChars, setGetChars] = useState([]);
  const [search, setSearch] = useState("");

  const getCharacters = async () => {
    const response = await Axios.get(
      "https://rickandmortyapi.com/api/character"
    );
    setGetChars(response.data.results);
  };

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    getCharacters();
  }, []);

  const filteredChars = getChars.filter((character) =>
    character.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="App">
      <h1>Rick and Morty Wiki</h1>
      <div className="input-group mb-3 text-center">
        <div className="input-group-prepend">
          <span className="input-group-text" id="inputGroup-sizing-default">
            Filter Characters
          </span>
        </div>
        <input
          onChange={handleChange}
          type="text"
          className="form-control"
          aria-label="Default"
          aria-describedby="inputGroup-sizing-default"
        />
      </div>
      <div className="container">
        {filteredChars.map((chars) => {
          return (
            <ul key={chars.id}>
              <li key={chars.id}>
                <div className="card" style={{ width: "18rem" }}>
                  <img
                    className="card-img-top"
                    src={chars.image}
                    alt={chars.name}
                  />
                  <div className="card-body">
                    <p className="card-text">
                      <strong>Name: </strong>
                      {chars.name}
                    </p>
                    <p className="card-text">
                      <strong>Species: </strong>
                      {chars.species}
                    </p>
                    <p className="card-text">
                      <strong>Status: </strong>
                      {chars.status}
                    </p>
                    <p className="card-text">
                      <strong>Origin: </strong>
                      {chars.origin.name}
                    </p>
                  </div>
                </div>
              </li>
            </ul>
          );
        })}
      </div>
    </div>
  );
}

export default App;
