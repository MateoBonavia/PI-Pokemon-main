import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { postPokemon, getTypes } from "../../store/actions";
import NavBar from "../navBar/navBar";
import style from "./createPokemon.module.css";

export default function CreatePokemon() {
  const dispatch = useDispatch();
  const selectType = useSelector((state) => state.types);
  const [error, setError] = useState({});

  const [handleTypes, setHandleTypes] = useState([]);

  const [input, setInput] = useState({
    name: "",
    hp: "",
    attack: "",
    defense: "",
    speed: "",
    height: "",
    weight: "",
    types: [],
    image: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/865.png",
  });

  const resetState = () => {
    setInput({
      name: "",
      hp: "",
      attack: "",
      defense: "",
      speed: "",
      height: "",
      weight: "",
      types: [],
      image: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/865.png",
    });
  };

  let validateName = /^[a-z]+$/i;
  let validateNum = /^([0-9])*$/;
  let validateUrl = /^(ftp|http|https):\/\/[^ "]+$/;

  // -----------------------------------------------------------------------------------------------------------------------------------
  // Validate.
  // -----------------------------------------------------------------------------------------------------------------------------------

  const validate = () => {
    let errors = {};
    if (!validateName.test(input.name) || !input.name) {
      errors.name = "Name required and must be letters";
    }
    if (!validateUrl.test(input.img)) {
      errors.img = "URL required";
    }
    if (!validateNum.test(input.hp) || !input.hp.length) {
      errors.hp = "HP is require and must be a number";
    }
    if (!validateNum.test(input.attack) || !input.attack.length) {
      errors.attack = "Attack is require and must be a number";
    }
    if (!validateNum.test(input.defense) || !input.defense.length) {
      errors.defense = "Defense is require and must be a number";
    }
    if (!validateNum.test(input.speed) || !input.speed.length) {
      errors.speed = "Speed is require and must be a number";
    }
    if (!validateNum.test(input.height) || !input.height.length) {
      errors.height = "Height is require and must be a number";
    }
    if (!validateNum.test(input.weight) || !input.weight.length) {
      errors.weight = "Weight is require and must be a number";
    }

    return errors;
  };

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setError(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }

  function handleSelect(e) {
    if (handleTypes.find((x) => x === e.target.value)) {
      setHandleTypes(handleTypes.filter((x) => x !== e.target.value));
    } else {
      if (handleTypes.length === 2) return;
      setHandleTypes([...handleTypes, e.target.value]);
    }
  }

  function handleSubmitPost(e) {
    e.preventDefault();
    if (
      !error.name &&
      !error.hp &&
      !error.attack &&
      !error.defense &&
      !error.speed &&
      !error.height &&
      !error.weight &&
      !error.types
    ) {
      if (
        input.name.length !== 0 &&
        input.hp.length !== 0 &&
        input.attack.length !== 0
      ) {
        setInput({
          ...input,
          types: handleTypes.map((e) => input.types.push(e)),
        });
        console.log(input.image);
        dispatch(postPokemon(input));
        resetState();
        alert("Pokemon successfully created ");
      } else {
        alert("The form is required");
      }
    } else {
      alert("The form is required");
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
        <div>
          <label className={style.label}>Name:</label>
          <input
            key="name"
            type="text"
            value={input.name}
            name="name"
            onChange={(e) => handleChange(e)}
            className={style.input}
          />
          {!error ? null : <p className={style.errorName}>{error.name}</p>}
        </div>

        <div className={style.inputLabel}>
          <label className={style.label}>Hp:</label>
          <input
            key="hp"
            type="number"
            value={input.hp}
            name="hp"
            onChange={(e) => handleChange(e)}
            className={style.input}
          />
          {!error ? null : <p className={style.errorHp}>{error.hp}</p>}
        </div>

        <div className={style.inputLabel}>
          <label className={style.label}>Attack:</label>
          <input
            key="attack"
            type="number"
            value={input.attack}
            name="attack"
            onChange={(e) => handleChange(e)}
            className={style.input}
          />
          {!error ? null : <p className={style.errorAttack}>{error.attack}</p>}
        </div>

        <div className={style.inputLabel}>
          <label className={style.label}>Defense:</label>
          <input
            key="defense"
            type="number"
            value={input.defense}
            name="defense"
            onChange={(e) => handleChange(e)}
            className={style.input}
          />
          {!error ? null : (
            <p className={style.errorDefense}>{error.defense}</p>
          )}
        </div>

        <div className={style.inputLabel}>
          <label className={style.label}>Speed:</label>
          <input
            key="speed"
            type="number"
            value={input.speed}
            name="speed"
            onChange={(e) => handleChange(e)}
            className={style.input}
          />
          {!error ? null : <p className={style.errorSpeed}>{error.speed}</p>}
        </div>

        <div className={style.inputLabel}>
          <label className={style.label}>Height:</label>
          <input
            key="height"
            type="number"
            value={input.height}
            name="height"
            onChange={(e) => handleChange(e)}
            className={style.input}
          />
          {!error ? null : <p className={style.errorHeight}>{error.height}</p>}
        </div>

        <div className={style.inputLabel}>
          <label className={style.label}>Weight:</label>
          <input
            key="weight"
            type="number"
            value={input.weight}
            name="weight"
            onChange={(e) => handleChange(e)}
            className={style.input}
          />
          {!error ? null : <p className={style.errorWeight}>{error.weight}</p>}
        </div>

        {/* <div className={style.inputLabel}>
          <label className={style.label}>Image:</label>
          <input
            key="image"
            type="text"
            value={input.image}
            name="image"
            onChange={(e) => handleChange(e)}
            className={style.input}
          />
        </div> */}

        <div className={style.selectTypes}>
          <label className={style.selectTypes__text}>Choose the Type</label>
          <select
            name="types"
            onChange={(e) => handleSelect(e)}
            className={style.selectType}
          >
            {selectType.map((t, i) => {
              return (
                <option value={t.name} key={i}>
                  {t.name}
                </option>
              );
            })}
          </select>
          {!error ? null : <p className={style.errorT}>{error.types}</p>}
          {handleTypes.map((e, i) => {
            return (
              <div key={i}>
                <button
                  type="button"
                  value={e}
                  onClick={(e) => handleSelect(e)}
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
          <button className={style.back}>Go back</button>
        </Link>
      </form>
    </div>
  );
}
