const { Router } = require("express");
const router = Router();
const { getAllPokemons } = require("./pokemonFunctions");
const { Pokemon, Type } = require("../db");

router.get("/", async (req, res, next) => {
  try {
    const name = req.query.name;
    const allPoke = await getAllPokemons();
    if (!name) {
      res.status(200).send(allPoke); //Si no se me paso un nombre, devuelvo todos los pokemones.
    } else {
      const result = allPoke.filter(
        (e) => e.name.toLowerCase().includes(name.toLowerCase()) // Filtro el nombre del pokemon pasado por query con los pokemones guardados en la api y en mi db.
      );
      result.length
        ? res.status(200).send(result)
        : res.status(404).send("Pokemon not found by name");
    }
  } catch (error) {
    console.log(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const allPoke = await getAllPokemons();

    if (id) {
      let pokemonId = allPoke.filter((el) => el.id == id); // Filtro el id del pokemon pasado por parametro con los pokemones guardados en la api y en mi db.
      pokemonId.length
        ? res.status(200).send(pokemonId)
        : res.status(404).send("Pokemon not found by id");
    }
  } catch (error) {
    console.log(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    let { name, hp, attack, defense, speed, height, weight, type, img } =
      req.body;

    let allPoke = await getAllPokemons();

    let namePoke = allPoke.filter((e) =>
      e.name.toLowerCase() === name.toLowerCase()
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
        img,
      });

      res
        .status(200)
        .send(`Your pokemon "${newPokemon.name}" was successfully created`);
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
