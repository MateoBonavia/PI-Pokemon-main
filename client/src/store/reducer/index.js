const initialState = {
  pokemons: [],
  allPokemons: [],
  types: [],
  details: {},
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
        pokemons: [action.payload],
      };

    case "GET_POKEMON_BY_ID":
      return {
        ...state,
        details: action.payload,
      };

    case "POST_POKEMON":
      return {
        ...state,
        pokemons: action.payload,
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
      const sortName =
        action.payload === "asc"
          ? state.pokemons.sort(function (a, b) {
              if (a.name > b.name) {
                return 1;
              }
              if (b.name > a.name) {
                return -1;
              }
              return 0;
            })
          : state.pokemons.sort(function (a, b) {
              if (a.name > b.name) {
                return -1;
              }
              if (b.name > a.name) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        pokemons: action.payload === "def" ? state.allPokemons : sortName,
      };

    case "ORDER_STENGTH":
      const sortStrength =
        action.payload === "low"
          ? state.pokemons.sort(function (a, b) {
              if (a.attack > b.attack) {
                return 1;
              }
              if (b.attack > a.attack) {
                return -1;
              }
              return 0;
            })
          : state.pokemons.sort(function (a, b) {
              if (a.attack > b.attack) {
                return -1;
              }
              if (b.attack > a.attack) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        pokemons: action.payload === "def" ? state.allPokemons : sortStrength,
      };

    default:
      return state;
  }
}
