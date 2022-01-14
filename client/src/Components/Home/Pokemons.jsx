import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetAllPokemons } from "../../store/actions/index";
import { Link } from "react-router-dom";
import Pokemon from "../Card/Pokemons";
import style from "./Pokemons.module.css";
import Paginado from "../Paginado/Paginado";
import NavBar from "../navBar/navBar";

function Pokemons() {
  let dispatch = useDispatch();

  const allPokemon = useSelector((state) => state.pokemons);
  const [currentPage, setCurrentPage] = useState(1);
  const [pokemonsPerPage, setPokemonsPerPage] = useState(12);
  const lastPoke = currentPage * pokemonsPerPage;
  const firstPoke = lastPoke - pokemonsPerPage;
  const currentPoke = allPokemon.slice(firstPoke, lastPoke);

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(GetAllPokemons());
  }, [dispatch]);

  return (
    <div>
      <NavBar />
      <Paginado
        pokemonsPerPage={pokemonsPerPage}
        allPokemon={allPokemon.length}
        paginado={paginado}
      />
      <div className={style.container_pokes}>
        {currentPoke.map((p, i) => {
          return (
            <div>
              <div className={style.card}>
                <Link to={"home/" + p.id}>
                  <Pokemon
                    name={p.name}
                    image={p.image}
                    types={p.type}
                    key={Math.random()}
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

export default Pokemons;
