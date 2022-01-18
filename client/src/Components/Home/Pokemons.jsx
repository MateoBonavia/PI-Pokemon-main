import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetAllPokemons, getTypes } from "../../store/actions/index";
import { Link } from "react-router-dom";
import Pokemon from "../Cards/Pokemon";
import style from "./Pokemons.module.css";
import Paginado from "../Paginado/Paginado";
import NavBar from "../navBar/navBar";
import Loading from "../Loading/Loading";
import {
  filterType,
  filterCreated,
  orderName,
  orderStrength,
} from "../../store/actions/index";

function Pokemons() {
  let dispatch = useDispatch();

  const types = useSelector((state) => state.types);

  useEffect(() => {
    dispatch(GetAllPokemons());
    dispatch(getTypes());
  }, [dispatch]);

  const pokemons = useSelector((state) => state.pokemons);
  const [currentPage, setCurrentPage] = useState(1);
  const [pokemonsPerPage, setPokemonsPerPage] = useState(12);
  const lastPoke = currentPage * pokemonsPerPage;
  const firstPoke = lastPoke - pokemonsPerPage;
  const currentPoke = pokemons.slice(firstPoke, lastPoke);
  console.log(currentPoke);

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
    setPokemonsPerPage(12);
  };

  // -----------------------------------------------------------------------------------------------------------------------------------
  // Handlers para los filtros.
  // -----------------------------------------------------------------------------------------------------------------------------------

  const [order, setOrder] = useState("");

  function handleFilterType(e) {
    e.preventDefault();
    dispatch(filterType(e.target.value));
  }

  function handleFilterCreated(e) {
    e.preventDefault();
    dispatch(filterCreated(e.target.value));
  }

  function handleSortName(e) {
    e.preventDefault();
    dispatch(orderName(e.target.value));
    setCurrentPage(1);
    setOrder(`order ${e.target.value}`);
    order();
  }

  function handleSortStength(e) {
    e.preventDefault();
    dispatch(orderStrength(e.target.value));
    setCurrentPage(1);
    setOrder(`order ${e.target.value}`);
  }

  // -----------------------------------------------------------------------------------------------------------------------------------

  if (pokemons.length < 1) {
    return <Loading />;
  } else {
    return (
      <div>
        <NavBar />

        {/* ---------------------------------------------------------------------------------------------------------------------------------------------------- */}
        {/* Filters */}
        {/* ---------------------------------------------------------------------------------------------------------------------------------------------------- */}
        <div className={style.filtersContainer}>
          <select onChange={(e) => handleSortName(e)} className={style.select}>
            <option value="def">Default</option>
            <option value="asc">Ascending A-Z</option>
            <option value="desc">Descending Z-A</option>
          </select>

          <select
            onChange={(e) => handleFilterType(e)}
            className={style.select}
          >
            <option value="All">Filter Type</option>
            {types.map((t, i) => {
              return (
                <option value={t.name} key={i}>
                  {t.name.charAt(0).toUpperCase() + t.name.slice(1)}
                </option>
              );
            })}
          </select>

          <select
            className={style.select}
            onChange={(e) => handleSortStength(e)}
          >
            <option value="def">Strength</option>
            <option value="high">High strength</option>
            <option value="low">Low strength</option>
          </select>

          <select
            onChange={(e) => handleFilterCreated(e)}
            className={style.select}
          >
            <option value="All">All</option>
            <option value="pokedex">Pokedex</option>
            <option value="created">Created</option>
          </select>
        </div>
        {/* -------------------------------------------------------------------------------------------------------------- */}

        <Paginado
          pokemonsPerPage={pokemonsPerPage}
          pokemons={pokemons.length}
          paginado={paginado}
        />
        <div className={style.container_pokes}>
          {currentPoke.map((p, i) => {
            return (
              <div>
                <div className={style.card}>
                  <Link to={`/pokemon/${p.id}`}>
                    <Pokemon
                      key={i}
                      name={p.name}
                      img={p.image ? p.image : p.img}
                      types={p.types}
                      createInDb={p.createInDb}
                    />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Pokemons;
