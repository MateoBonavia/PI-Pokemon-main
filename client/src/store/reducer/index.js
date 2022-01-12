const initialState = {
  pokemon: [],
  pokemons: [],
  types: [],
  details: [],
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_ALLPOKEMONS":
      return {
        ...state,
        pokemons: action.payload,
      };

    case "POKEMON_FOUND":
      return {
        ...state,
        pokemons: [action.payload],
      };

    case "POKEMON_NOT_FOUND":
      return {
        ...state,
        pokemons: "Pokemon not found",
      };

    default:
      return state;
  }
}
