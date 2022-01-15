const { Pokemon, Type } = require("../db");
const axios = require("axios");

// --------------------------------------------------------------------------------------------------------
//  Traer pokemons desde la API.
// --------------------------------------------------------------------------------------------------------

const getPokeFromApi = async () => {
  try {
    const Api = await axios.get("https://pokeapi.co/api/v2/pokemon");
    const ApiSec = await axios.get(Api.data.next);
    const resMap = Api.data.results.map((e) => axios.get(e.url));
    const resMapSec = ApiSec.data.results.map((e) => axios.get(e.url));
    const pokeConcat = resMap.concat(resMapSec);
    const promise = await Promise.all(pokeConcat).then((e) => {
      let pokemon = e.map((e) => e.data);
      let arrPoke = [];
      pokemon.map((e) => {
        arrPoke.push({
          id: e.id,
          name: e.name,
          hp: e.stats[0].base_stat,
          attack: e.stats[1].base_stat,
          defense: e.stats[2].base_stat,
          speed: e.stats[5].base_stat,
          height: e.height,
          weight: e.weight,
          types: e.types.map((e) => e.type.name),
          image: e.sprites.other.dream_world.front_default,
        });
      });
      return arrPoke;
    });
    return promise;
  } catch (e) {
    console.log(e);
  }
};

// --------------------------------------------------------------------------------------------------------
//  Traer pokemons desde la DB.
// --------------------------------------------------------------------------------------------------------

const getPokeFromDb = async () => {
  try {
    const pokemonesDb = await Pokemon.findAll({
      include: {
        model: Type,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });

    return pokemonesDb;
  } catch (error) {
    console.log(error);
  }
};

// --------------------------------------------------------------------------------------------------------
//  Juntamos todos los pokemones.
// --------------------------------------------------------------------------------------------------------

const getAllPokemons = async () => {
  const api = await getPokeFromApi();
  const db = await getPokeFromDb();

  if (db.length > 0) {
    const info = api.concat(db);
    return info;
  } else {
    const info = api;
    return info;
  }
};

module.exports = { getAllPokemons };
