import React from "react";
import { useDispatch } from "react-redux";
import { GetAllPokemons } from "../../store/actions/index";
import { Link } from "react-router-dom";
import style from "./navBar.module.css";
import SearchBar from "../SearchBar/searchBar";

export default function NavBar() {
  const dispatch = useDispatch();

  function handleClick(e) {
    e.preventDefault();
    dispatch(GetAllPokemons());
  }

  return (
    <div className={style.contenedor}>
      <SearchBar className={style.SearchBar}/>
      <button
        onClick={(e) => {
          handleClick(e);
        }}
        key={Math.random()}
        className={style.button}
      >
        Recargar
      </button>
      <Link to="/pokemon" className={style.create}>
        Create Pokemon
      </Link>
    </div>
  );
}
