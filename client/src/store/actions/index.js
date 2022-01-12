import axios from "axios";
export const GET_ALL_POKEMONS = "GET_ALL_POKEMONS";
export const GET_POKEMON = "GET_POKEMON ";

export function GetAllPokemons() {
  return function (dispatch) {
    axios
      .get("http://localhost:3001/api/pokemons")
      .then((poke) => {
        dispatch({
          type: GET_ALL_POKEMONS,
          PAYLOAD: poke.data,
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
      .get(`http://localhost:3001/api/pokemons?name=${search}`)
      .then((json) => dispatch({ type: "POKEMON_FOUND", payload: json.data }))
      .catch((e) => {
        dispatch({ type: "POKEMON_NOT_FOUND", payload: e });
      });
  };
}
