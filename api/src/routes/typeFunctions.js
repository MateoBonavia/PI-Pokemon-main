const { Type } = require("../db");
const axios = require("axios");

// --------------------------------------------------------------------------------------------------------
//  Traer tipos desde la API.
// --------------------------------------------------------------------------------------------------------

const getTypes = async () => {
  try {
    const apiTypes = await axios.get("https://pokeapi.co/api/v2/type");
    const data = apiTypes.data.results;

    data.forEach((e) => {
      Type.findOrCreate({
        where: {
          name: e.name,
        },
      });
    });

    const typesDb = await Type.findAll();

    return typesDb;
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getTypes };
