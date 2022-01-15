import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { postPokemon, getTypes } from "../../store/actions";
import NavBar from "../navBar/navBar";
import style from "./createPokemon.module.css";

function validate(input) {
  let errors = {};

  if (!input.name) {
    errors.name = "Dont Forget My Name";
  }
  if (!input.hp) {
    errors.hp = "Dont Forget My Hp";
  }
  if (!input.attack) {
    errors.attack = "Dont Forget My Attack";
  }

  if (!input.types.length) {
    errors.types = "Dont Forget My Type";
  }

  return errors;
}

export default function CreatePokemon() {
  const dispatch = useDispatch();
  const selectType = useSelector((state) => state.types);

  const [input, setInput] = useState({
    name: "",
    hp: "",
    attack: "",
    defense: "",
    speed: "",
    height: "",
    weight: "",
    types: [],
    img: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/865.png",
  });

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }

  function handleSelect(e) {
    setInput({
      ...input,
      types: [...input.types, e.target.value],
    });
  }

  function handleDelete(e) {
    setInput({
      ...input,
      types: input.types.filter((t) => t !== e),
    });
  }

  function handleSubmitPost(e) {
    e.preventDefault();
    const error = validate(input);

    if (!Object.keys(error).length) {
      dispatch(postPokemon(input));
      alert("Pokemon Was Successfully Create!!");
      setInput({
        name: "",
        hp: "",
        attack: "",
        defense: "",
        speed: "",
        height: "",
        weight: "",
        types: [],
        img: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/865.png",
      });
    } else {
      alert("The Name, Hp , Attack and Type are obligatory!!");
    }
  }

  useEffect(() => {
    dispatch(getTypes());
  }, [dispatch]);

  return (
    <div className={style.container}>
      <NavBar />

      <h1 className={style.title}>Create a Pokemon!</h1>

      <form onSubmit={(e) => handleSubmitPost(e)} className={style.form}>
        <div className={style.inputLabel}>
          <label className={style.label}>Name:</label>
          <input
            type="text"
            value={input.name}
            name="name"
            onChange={(e) => handleChange(e)}
            className={style.input}
          />
        </div>

        <div className={style.inputLabel}>
          <label className={style.label}>Hp:</label>
          <input
            type="number"
            value={input.hp}
            name="hp"
            onChange={(e) => handleChange(e)}
            className={style.input}
          />
        </div>

        <div className={style.inputLabel}>
          <label className={style.label}>Attack:</label>
          <input
            type="number"
            value={input.attack}
            name="attack"
            onChange={(e) => handleChange(e)}
            className={style.input}
          />
        </div>

        <div className={style.inputLabel}>
          <label className={style.label}>Defense:</label>
          <input
            type="number"
            value={input.defense}
            name="defense"
            onChange={(e) => handleChange(e)}
            className={style.input}
          />
        </div>

        <div className={style.inputLabel}>
          <label className={style.label}>Speed:</label>
          <input
            type="number"
            value={input.speed}
            name="speed"
            onChange={(e) => handleChange(e)}
            className={style.input}
          />
        </div>

        <div className={style.inputLabel}>
          <label className={style.label}>Height:</label>
          <input
            type="number"
            value={input.height}
            name="height"
            onChange={(e) => handleChange(e)}
            className={style.input}
          />
        </div>

        <div className={style.inputLabel}>
          <label className={style.label}>Weight:</label>
          <input
            type="number"
            value={input.weight}
            name="weight"
            onChange={(e) => handleChange(e)}
            className={style.input}
          />
        </div>

        {/* <div>
          <label>Image:</label>
          <input
            type="text"
            value={input.image}
            name="image"
            onChange={(e) => handleChange(e)}
          />
        </div> */}

        <div className={style.selectTypes}>
          <label className={style.selectTypes__text}>Choose the Type</label>
          <select name="types" onChange={(e) => handleSelect(e)}>
            {selectType.map((t, i) => {
              return (
                <option value={t.name} key={i}>
                  {t.name}
                </option>
              );
            })}
          </select>
          {input.types.map((e, i) => {
            return (
              <div key={i}>
                <button
                  type="button"
                  className="EliminateType"
                  onClick={() => handleDelete(e)}
                >
                  X
                </button>
                <span>{e}</span>
              </div>
            );
          })}
        </div>

        <button type="submit" className={style.buttonCreate}>
          Create
        </button>

        <Link to="/home" className={style.goBack}>
          <button>Go back</button>
        </Link>
      </form>
    </div>
  );
}
