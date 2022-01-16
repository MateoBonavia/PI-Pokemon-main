import axios from "axios";

export function GetAllPokemons() {
  return function (dispatch) {
    axios
      .get("http://localhost:3001/api/pokemon")
      .then((pokemon) => {
        dispatch({
          type: "GET_ALL_POKEMONS",
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
    try {
      return await axios
        .get(`http://localhost:3001/api/pokemon?name=${search}`)
        .then((json) =>
          dispatch({ type: "GET_POKEMON_BY_NAME", payload: json.data })
        );
    } catch (e) {
      console.log(e);
    }
  };
}

export function getPokemonById(id) {
  return async function (dispatch) {
    try {
      return await axios
        .get(`http://localhost:3001/api/pokemon/${id}`)
        .then((res) => {
          dispatch({ type: "GET_POKEMON_BY_ID", payload: res.data });
        });
    } catch (e) {
      console.log(e);
    }
  };
}

export function postPokemon(payload) {
  try {
    return async function (dispatch) {
      const res = await axios.post(
        "http://localhost:3001/api/pokemon",
        payload
      );
      return res;
    };
  } catch (e) {
    console.log(e);
  }
}

export function getTypes() {
  try {
    return async function (dispatch) {
      let info = await axios.get("http://localhost:3001/api/type");
      dispatch({
        type: "GET_TYPES",
        payload: info.data,
      });
    };
  } catch (e) {
    console.log(e);
  }
}

export function filterCreated(payload) {
  return {
    type: "FILTER_CREATED",
    payload,
  };
}

export function filterType(payload) {
  return {
    type: "FILTER_TYPE",
    payload,
  };
}

export function orderName(payload) {
  return {
    type: "ORDER_NAME",
    payload,
  };
}
