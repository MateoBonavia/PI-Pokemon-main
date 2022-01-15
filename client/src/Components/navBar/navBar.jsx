import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { GetAllPokemons } from "../../store/actions/index";
import { Link } from "react-router-dom";
import Filters from "../Filters/Filters";
import style from "./navBar.module.css";
import Logo from "../../img/Logo.png";
import SearchBar from "../SearchBar/searchBar";

export default function NavBar() {
  const dispatch = useDispatch();

  function handleClick(e) {
    e.preventDefault();
    dispatch(GetAllPokemons());
  }

  useEffect(() => {
    dispatch(GetAllPokemons());
  }, [dispatch]);

  return (
    <div className={style.contenedor}>
      <Filters />
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
      <img src={Logo} className={style.img} alt="Logo"></img>
      <Link to="/pokemon" className={style.create}>
        Create Pokemon
      </Link>
    </div>
  );
}
