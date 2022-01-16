import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getPokemonById } from "../../store/actions";
import { useEffect } from "react";
import style from "./card.module.css";
import NavBar from "../navBar/navBar";

export default function Card(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPokemonById(props.match.params.id));
  }, [dispatch]);

  const pokemon = useSelector((state) => state.details);

  return (
    <div>
      <NavBar />
      {pokemon.length > 0 ? (
        <div className={style.container}>
          <h1 className={style.name}>{pokemon[0].name}</h1>
          <img
            src={pokemon[0].image ? pokemon[0].image : pokemon[0].img}
            alt=""
            className={style.img}
          />
          <h3 className={style.type}>{pokemon[0].types}</h3>
          <h4 className={style.info}>Hp {pokemon[0].hp}</h4>
          <h4 className={style.info}>Attack {pokemon[0].attack}</h4>
          <h4 className={style.info}>Defense {pokemon[0].defense}</h4>
          <h4 className={style.info}>Speed {pokemon[0].speed}</h4>
          <h4 className={style.info}>Height {pokemon[0].height}</h4>
          <h4 className={style.info}>Weight {pokemon[0].weight}</h4>
        </div>
      ) : (
        <p>Loading...</p>
      )}

      <Link to="/home">GO BACK</Link>
    </div>
  );
}
