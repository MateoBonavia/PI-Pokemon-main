import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { GetAllPokemons } from "../../store/actions/index";
import { Link } from "react-router-dom";
import Filters from "../Filters/Filters";

export default function NavBar() {
  const dispatch = useDispatch();

  function handleClick(e) {
    e.preventDefault();
    dispatch(GetAllPokemons);
  }

  useEffect(() => {
    dispatch(GetAllPokemons());
  }, [dispatch]);

  return (
    <div>
      <Filters />
      <button
        onClick={(e) => {
          handleClick(e);
        }}
        key={Math.random()}
      >
        Recargar
      </button>
      <Link to="/pokemon">Crear Pokemon</Link>
    </div>
  );
}
