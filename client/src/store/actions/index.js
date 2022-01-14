import axios from "axios";
export const GET_ALL_POKEMONS = "GET_ALL_POKEMONS";
export const GET_POKEMON = "GET_POKEMON";

export function GetAllPokemons() {
  return function (dispatch) {
    axios
      .get("http://localhost:3001/api/pokemon")
      .then((pokemon) => {
        dispatch({
          type: GET_ALL_POKEMONS,
          payload: pokemon.data,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };
}

export function getPokemonByName(search) {
  return async function (dispatch) {
    return await axios
      .get(`http://localhost:3001/api/pokemon?name=${search}`)
      .then((json) =>
        dispatch({ type: "POKEMON_ENCONTRADO", payload: json.data })
      )
      .catch((error) =>
        dispatch({ type: "POKEMON_NO_ENCONTRADO", payload: error })
      );
  };
}
