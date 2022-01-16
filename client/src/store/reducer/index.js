const initialState = {
  pokemons: [],
  allPokemons: [],
  types: [],
  details: [],
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_ALL_POKEMONS":
      return {
        ...state,
        pokemons: action.payload,
        allPokemons: action.payload,
      };

    case "GET_POKEMON_BY_NAME":
      return {
        ...state,
        pokemons: action.payload,
      };

    case "GET_POKEMON_BY_ID":
      return {
        ...state,
        details: action.payload,
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

    case "FILTER_CREATED":
      const filter =
        action.payload === "created"
          ? state.allPokemons.filter((e) => e.createInDb)
          : state.allPokemons.filter((e) => !e.createInDb);
      return {
        ...state,
        pokemons: action.payload === "All" ? state.allPokemons : filter,
      };

    case "FILTER_TYPE":
      let res =
        action.payload === "All"
          ? state.allPokemons
          : state.allPokemons.filter((p) =>
              p.types.some(
                (t) => t === action.payload || t.name === action.payload
              )
            );
      return {
        ...state,
        pokemons: res,
      };

    case "ORDER_NAME":
      let sortedArr =
        action.payload === "asc"
          ? state.pokemons.sort((a, b) => {
              return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
            })
          : state.pokemons.sort((a, b) => {
              return b.name.toLowerCase().localeCompare(a.name.toLowerCase());
            });
      return {
        ...state,
        pokemons: action.payload === "def" ? state.allPokemons : sortedArr,
      };

    default:
      return state;
  }
}
