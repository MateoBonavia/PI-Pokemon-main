import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getPokemonById } from "../../store/actions";
import { useEffect } from "react";
import style from "./card.module.css";
import NavBar from "../navBar/navBar";
import Loading from "../Loading/Loading";

export default function Card(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPokemonById(props.match.params.id));
  }, [dispatch, props]);

  const pokemon = useSelector((state) => state.details);
  console.log(pokemon);
  console.log(pokemon.types);

  if (pokemon) {
    const pokeDet = () => {
      return (
        <div className={style.containerGeneral}>
          <NavBar />
          <div className={style.container}>
            <h1 className={style.name}>{pokemon.name}</h1>
            <img
              src={pokemon.image ? pokemon.image : pokemon.img}
              alt=""
              className={style.img}
            />
            <div className={style.types}>
              {pokemon.types.map((e) => (
                <p>{e}</p>
              ))}
            </div>
            <div className={style.infoContainer}>
              <h4 className={style.info}>Hp {pokemon.hp}</h4>
              <h4 className={style.info}>Attack {pokemon.attack}</h4>
              <h4 className={style.info}>Defense {pokemon.defense}</h4>
              <h4 className={style.info}>Speed {pokemon.speed}</h4>
              <h4 className={style.info}>Height {pokemon.height}</h4>
              <h4 className={style.info}>Weight {pokemon.weight}</h4>
            </div>
            <Link to="/home" className={style.back}>
              GO BACK
            </Link>
          </div>
        </div>
      );
    };
    return pokemon.name ? pokeDet() : <Loading />;
  }
}
