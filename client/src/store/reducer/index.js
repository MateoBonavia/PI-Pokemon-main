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
  
      case "POKEMON_ENCONTRADO":
        console.log(action.payload);
        return {
          ...state,
          pokemons: [action.payload],
        };
  
      case "POKEMON_NO_ENCONTRADO":
        console.log(action.payload);
        return {
          ...state,
          pokemons: "Pokemon no encontrado",
        };
  
      default:
        return state;
    }
  }