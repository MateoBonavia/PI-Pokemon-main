const initialState = {
  pokemon: [],
  pokemons: [],
  types: [],
  details: [],
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_ALL_POKEMONS":
      return {
        ...state,
        pokemons: action.payload,
      };

    case "GET_POKEMON_BY_NAME":
      return {
        ...state,
        pokemons: action.payload,
      };

    case "POST_CHARACTER":
      return {
        ...state,
      };

    case "GET_TYPES":
      return {
        ...state,
        types: action.payload,
      };

    default:
      return state;
  }
}
