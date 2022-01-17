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

  const [input, setInput] = useState({
    name: "",
    hp: "",
    attack: "",
    defense: "",
    speed: "",
    height: "",
    weight: "",
    types: [],
    img: "",
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
      img: "",
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
    if (!validateName.test(input.name)) {
      errors.name = "Name required and must be letters";
    }
    if (!validateUrl.test(input.img)) {
      errors.img = "URL required";
    }
    if (!validateNum.test(input.hp) || input.hp < 1 || input.hp > 300) {
      errors.hp = "HP is require and must be a number between 0 and 300";
    }
    if (
      !validateNum.test(input.attack) ||
      input.attack < 10 ||
      input.attack > 500
    ) {
      errors.attack =
        "Attack is require and must be a number between 10 and 500";
    }
    if (
      !validateNum.test(input.defense) ||
      input.defense < 0 ||
      input.defense > 100
    ) {
      errors.defense =
        "Defense is require and must be a number between 0 and 100";
    }
    if (
      !validateNum.test(input.speed) ||
      input.speed < 10 ||
      input.speed > 500
    ) {
      errors.speed = "Speed is require and must be a number between 10 and 500";
    }
    if (
      !validateNum.test(input.height) ||
      input.height < 10 ||
      input.height > 300
    ) {
      errors.height =
        "Height is require and must be a number between 10 and 300";
    }
    if (
      !validateNum.test(input.weight) ||
      input.weight < 10 ||
      input.weight > 100
    ) {
      errors.weight =
        "Weight is require and must be a number between 10 and 100";
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
    console.log(error);
    e.preventDefault();
    if (
      !error.name &&
      !error.hp &&
      !error.attack &&
      !error.defense &&
      !error.speed &&
      !error.heightt &&
      !error.weight &&
      !error.types
    ) {
      dispatch(postPokemon(input));
      resetState();
      alert("Pokemon successfully created ");
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
          {!error ? null : (
            <span className={style.errorName}>{error.name}</span>
          )}
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
          {!error ? null : <span className={style.errorHp}>{error.hp}</span>}
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
          {!error ? null : (
            <span className={style.errorAttack}>{error.attack}</span>
          )}
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
            <span className={style.errorDefense}>{error.defense}</span>
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
          {!error ? null : (
            <span className={style.errorSpeed}>{error.speed}</span>
          )}
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
          {!error ? null : (
            <span className={style.errorHeight}>{error.height}</span>
          )}
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
          {!error ? null : (
            <span className={style.errorWeight}>{error.weight}</span>
          )}
        </div>

        <div className={style.inputLabel}>
          <label className={style.label}>Image:</label>
          <input
            key="image"
            type="text"
            value={input.image}
            name="image"
            onChange={(e) => handleChange(e)}
            className={style.input}
          />
        </div>

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
          <button className={style.back}>Go back</button>
        </Link>
      </form>
    </div>
  );
}
