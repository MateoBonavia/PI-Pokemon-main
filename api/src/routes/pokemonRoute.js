const { Router } = require("express");
const router = Router();
const {
  getAllPokemons,
  findPokeById,
  getPokeByNameApi,
  getPokeByNameDb,
} = require("./pokemonFunctions");
const { Pokemon, Type } = require("../db");

router.get("/", async (req, res, next) => {
  try {
    const name = req.query.name;
    const allPoke = await getAllPokemons();
    if (!name) {
      res.status(200).send(allPoke);
    } else {
      let apiInfo = await getPokeByNameApi(name);
      let dbInfo = await getPokeByNameDb(name);

      if (apiInfo !== "undefined") return res.send(apiInfo);
      if (dbInfo !== "undefined") return res.send(dbInfo);
      return res.send("Pokemon not found");
    }
  } catch (error) {
    console.log(error);
  }
});

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    let poke = await findPokeById(id);
    res.send(poke);
  } catch (error) {
    console.log(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    let {
      name,
      hp,
      attack,
      defense,
      speed,
      height,
      weight,
      types,
      image,
      createInDb,
    } = req.body;

    console.log(image);

    let allPoke = await getAllPokemons();

    let namePoke = allPoke.filter(
      (e) => e.name.toLowerCase() === name.toLowerCase()
    );

    if (!name) return res.status(400).send("Missing name");

    if (namePoke.length) {
      res.status(400).send("Pokemon already exists");
    } else {
      const newPokemon = await Pokemon.create({
        name,
        hp,
        attack,
        defense,
        speed,
        height,
        weight,
        image,
        createInDb,
      });

      let typeDb = await Type.findAll({
        where: { name: types },
      });

      newPokemon.addType(typeDb);

      res
        .status(200)
        .send(`Your pokemon "${newPokemon.name}" was successfully created`);
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
