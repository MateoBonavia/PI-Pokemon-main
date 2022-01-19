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
//  Buscar pokemon por id.
// --------------------------------------------------------------------------------------------------------

const findPokeById = async (id) => {
  console.log(id);
  try {
    if (id.length < 5) {
      let poke = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);

      let pokemon = {
        id: poke.data.id,
        image: poke.data.sprites.other.dream_world.front_default,
        name: poke.data.name,
        types: poke.data.types.map((t) => t.type.name),
        hp: poke.data.stats[0].base_stat,
        attack: poke.data.stats[1].base_stat,
        defense: poke.data.stats[2].base_stat,
        speed: poke.data.stats[5].base_stat,
        height: poke.data.height,
        weight: poke.data.weight,
      };
      return pokemon;
    } else {
      let poke = await Pokemon.findByPk(id, { include: { model: Type } });

      let pokemon = {
        id: poke.id,
        image: poke.image,
        name: poke.name,
        types: poke.types.map((t) => t.name),
        hp: poke.hp,
        attack: poke.attack,
        defense: poke.defense,
        speed: poke.speed,
        height: poke.height,
        weight: poke.weight,
      };

      return pokemon;
    }
  } catch (e) {
    return "Pokemon not found";
  }
};

// --------------------------------------------------------------------------------------------------------
//  Buscar pokemon por name API.
// --------------------------------------------------------------------------------------------------------

const getPokeByNameApi = async (name) => {
  name = name.toLowerCase();
  try {
    const poke = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}/`);

    const pokeInfo = {
      id: poke.data.id,
      image: poke.data.sprites.other.dream_world.front_default,
      name: poke.data.name,
      types: poke.data.types.map((t) => t.type.name),
      hp: poke.data.stats[0].base_stat,
      attack: poke.data.stats[1].base_stat,
      defense: poke.data.stats[2].base_stat,
      speed: poke.data.stats[5].base_stat,
      height: poke.data.height,
      weight: poke.data.weight,
    };

    return pokeInfo;
  } catch (e) {
    console.log(e);
  }
};

// --------------------------------------------------------------------------------------------------------
//  Buscar pokemon por name DB.
// --------------------------------------------------------------------------------------------------------

const getPokeByNameDb = async (name) => {
  name = name.toLowerCase();
  try {
    const poke = await Pokemon.findOne({
      whee: {
        name: name,
      },
      attributes: [
        "name",
        "hp",
        "attack",
        "defense",
        "speed",
        "height",
        "weight",
        "image",
        "createInDb",
      ],
    });
    return poke;
  } catch (e) {
    console.log(e);
  }
};

// --------------------------------------------------------------------------------------------------------
//  Juntamos todos los pokemones.
// --------------------------------------------------------------------------------------------------------

const getAllPokemons = async () => {
  const api = await getPokeFromApi();
  const db = await getPokeFromDb();

  const info = api.concat(db);
  return info;
};

module.exports = {
  getAllPokemons,
  findPokeById,
  getPokeByNameApi,
  getPokeByNameDb,
};
