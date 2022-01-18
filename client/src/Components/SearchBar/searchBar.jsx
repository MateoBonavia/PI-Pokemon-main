import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getPokemonByName } from "../../store/actions";
import style from "./searchBar.module.css";

export default function SearchBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  function handleInputChange(e) {
    console.log("entre");
    setName(e.target.value);
  }

  function handleSubmit(e) {
    console.log("entre");
    e.preventDefault();
    dispatch(getPokemonByName(name));
    console.log("dispatch");
    setName("");
  }

  return (
    <div className={style.container}>
      <input
        type="text"
        placeholder=" Search..."
        onChange={(e) => handleInputChange(e)}
        className={style.search}
      />
      <button
        type="submit"
        onClick={(e) => handleSubmit(e)}
        className={style.button}
      >
        Search
      </button>
    </div>
  );
}
