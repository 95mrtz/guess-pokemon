import {useState, useEffect, useRef} from "react";

import api from "./api";

const App = () => {
  const imagenPokemon = useRef(null);
  const [pokemon, setPokemon] = useState({id: 0, name: "", image: ""});
  const [guess, setGuess] = useState(false);

  useEffect(() => {
    api.random().then(setPokemon);
    setGuess(false);
  }, []);

  // eslint-disable-next-line no-console
  console.log(pokemon);

  const handleGuess = () => {
    setGuess(true);
  };

  return (
    <main>
      <h1>Quien es este Pokemon?</h1>
      <img
        ref={imagenPokemon}
        alt={pokemon.name}
        className={guess ? "filterOff" : "filterOn"}
        height="400px"
        src={pokemon.image}
        width="500px"
      />
      <button onClick={handleGuess}> adivinar </button>
    </main>
  );
};

export default App;
