import {useState, useEffect, useRef} from "react";

import api from "./api";

const App = () => {
  const imagenPokemon = useRef(null);
  const [randomPokemon, setRandomPokemon] = useState({id: 0, name: "", image: ""});
  const [pokemon, setPokemon] = useState("");
  const [guess, setGuess] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  useEffect(() => {
    api.random().then(setRandomPokemon);
    setGuess(false);
  }, []);

  const handleChange = (event : React.ChangeEvent<HTMLInputElement>) => {
    setPokemon(event.target.value);
  };

  const handleSubmit = (event : React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setGuess(true);
  };

  return (
    <div className="app">
      <header>
        <p> POKEMON </p>
      </header>
      <main>
        <h1>Quien es este Pokemon?</h1>
        <div className="img-section">
          {loading ? (
            <h1> cargando...</h1>
          ) : (
            <img
              ref={imagenPokemon}
              alt={randomPokemon.name}
              className={guess ? "filterOff" : "filterOn"}
              height="300px"
              src={randomPokemon.image}
              width="400px"
            />
          )}
        </div>
        {guess ? <h2>{randomPokemon.name}</h2> : <h2> ??? </h2>}
        <form className="form-guess" onSubmit={handleSubmit}>
          <input
            className="input-guess"
            placeholder={"ingrese el nombre"}
            type={"text"}
            value={pokemon}
            onChange={handleChange}
            required
          />
          <input className="btn-guess" type="submit" value="adivinar" />
        </form>
      </main>
    </div>
  );
};

export default App;
