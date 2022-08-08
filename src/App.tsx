import {useState, useEffect, useRef} from "react";

import api from "./api";

const App = () => {
  const imagenPokemon = useRef(null);
  const [randomPokemon, setRandomPokemon] = useState({
    id: 0,
    name: "",
    image: "",
  });
  const [pokemon, setPokemon] = useState("");
  const [guess, setGuess] = useState(false);
  const [loading, setLoading] = useState(true);
  //const [isCorrect, setIsCorrect] = useState(false);
  const [laRespuesta, setLaRespuesta] = useState("");

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  useEffect(() => {
    api.random().then(setRandomPokemon);
    setGuess(false);
  }, []);

  const nextPokemon = (time: number | undefined) => {
    setTimeout(() => {
      setLaRespuesta("");
      setGuess(false);
      setPokemon("");
      api.random().then(setRandomPokemon);
    }, time);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPokemon(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Pasamos toda la cadena a minuscula para no preocuparnos por las mayusculas
    let pokemonLowCase = pokemon.toLowerCase();
    // Reemplazamos los puntos y espacios por "" para que la cadena quede sin esto.
    let pokemonOnlyLetters = pokemonLowCase.replace(".", "").replace(" ", "");

    if (pokemonOnlyLetters === randomPokemon.name) {
      setGuess(true);
      setLaRespuesta("Correcto! es");
      nextPokemon(7000);
    } else {
      setLaRespuesta("Oh no! incorrecto :( ");
      nextPokemon(4000);
    }
  };

  return (
    <div className="app">
      <header>
        <a>
          <p>github</p>
        </a>
        <a>
          <p> Challenge by Goncy </p>
        </a>
        <a>
          <p>twitter</p>
        </a>
      </header>
      <main>
        <h1>Quien es este Pokemon?</h1>
        <section className="pokemon-section">
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
          <h2> {laRespuesta} </h2>
          {guess ? (
            <h2 className="pokemon-name">{randomPokemon.name}</h2>
          ) : (
            <h2 className="pokemon-name"> ??? </h2>
          )}
        </section>
        <section className="form-section">
          <form className="form-guess" onSubmit={handleSubmit}>
            <input
              required
              className="input-guess"
              placeholder={"ingrese el nombre"}
              type={"text"}
              value={pokemon}
              onChange={handleChange}
            />
            <input className="btn-guess" type="submit" value="adivinar" />
          </form>
          <button onClick={() => nextPokemon(1000)}>Volver a jugar</button>
        </section>
      </main>
    </div>
  );
};

export default App;
