const { Type } = require("../db");
const axios = require("axios");

// --------------------------------------------------------------------------------------------------------
//  Traer tipos desde la API.
// --------------------------------------------------------------------------------------------------------


const getTypes = async () => {
    try {
        const dbTypes = await Type.findAll({attributes: ['name', 'id']});

        if (!dbTypes.length) {
            const apiTypes = await axios.get('htps://pokeapi.co/api/v2/type');

            let types = apiTypes.data.results.map(e => {return {name: e.name}});

            Type.bulkCreate(types);

            return types;
        }

        return dbTypes;
        
    } catch (error){
        console.log(error);
    };
};

module.exports = { getTypes };
