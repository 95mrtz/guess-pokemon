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
  const [intentosCount, setIntentosCount] = useState(localStorage.getItem("intentosCount") || 0);
  const [laRespuesta, setLaRespuesta] = useState("");
  const [sucessCount, setSucessCount] = useState(localStorage.getItem("sucessCount") || 0);
  const [errorCount, setErrorCount] = useState(localStorage.getItem("errorCount") || 0);

  useEffect(() => {
    return localStorage.setItem("sucessCount", sucessCount.toString());
  }, [sucessCount]);

  useEffect(() => {
    localStorage.setItem("errorCount", errorCount.toString());
  }, [errorCount]);

  useEffect(() => {
    localStorage.setItem("intentosCount", intentosCount.toString());
  }, [intentosCount]);

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

  const startGame = () => {
    setTimeout(() => {
      setLaRespuesta("");
      setGuess(false);
      setPokemon("");
      setSucessCount(Number(0));
      setErrorCount(Number(0));
      setIntentosCount(Number(0));
      api.random().then(setRandomPokemon);
    }, 1000);
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
      setSucessCount(Number(sucessCount) + 1);
      setIntentosCount(Number(intentosCount) + 1);
      nextPokemon(4000);
    } else {
      setLaRespuesta("Oh no! incorrecto :( ");
      setErrorCount(Number(errorCount) + 1);
      setIntentosCount(Number(intentosCount) + 1);
      nextPokemon(2000);
    }
  };

  return (
    <div className="app">
      <header>
        <a
          href="https://github.com/hctmanuelortiz/guess-pokemon"
          rel="noreferrer"
          target={"_blank"}
        >
          <i className="nes-icon github is-medium" />
        </a>
        <a href="https://github.com/goncy/interview-challenges" rel="noreferrer" target={"_blank"}>
          <p> Challenge by Goncy </p>
        </a>
        <a href="https://twitter.com/hctmanuelortiz" rel="noreferrer" target={"_blank"}>
          <i className="nes-icon twitter is-medium" />
        </a>
      </header>
      <main>
        <h1 className="title-section">Quien es este Pokemon?</h1>

        <div className="nes-container is-rounded is-dark count-section">
          <h3 className="nes-text is-disabled intentos"> Intentos: {intentosCount} </h3>
          <h3 className="nes-text is-success aciertos"> aciertos: {sucessCount} </h3>
          <h3 className="nes-text is-error errores"> errores: {errorCount} </h3>
        </div>
        <section className="pokemon-section">
          {loading ? (
            <h1> cargando...</h1>
          ) : (
            <img
              ref={imagenPokemon}
              alt={randomPokemon.name}
              className={guess ? "filterOff" : "filterOn"}
              src={randomPokemon.image}
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
              className="nes-input nes-pointer input-guess"
              placeholder={"ingrese el nombre"}
              type={"text"}
              value={pokemon}
              onChange={handleChange}
            />
            <input
              className="nes-btn is-primary nes-pointer btn-guess"
              type="submit"
              value="adivinar"
            />
          </form>
          <button className="nes-btn is-warning" onClick={startGame}>
            Volver a empezar
          </button>
        </section>
      </main>
    </div>
  );
};

export default App;
