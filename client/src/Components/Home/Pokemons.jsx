import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetAllPokemons } from "../../store/actions/index";
import Pokemon from "../Card/Pokemons";
import style from "./Pokemons.module.css";

function Pokemons() {
  let dispatch = useDispatch();

  const pokemon = useSelector((state) => state.pokemons);

  useEffect(() => {
    dispatch(GetAllPokemons());
  }, [dispatch]);

  return (
    <div>
      {pokemon.map((p, i) => {
        return (
          <div className = {style.container}>
            <div className={style.card}>
              <Pokemon
                name={p.name}
                image={p.image}
                types={p.type}
                key={Math.random()}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Pokemons;
