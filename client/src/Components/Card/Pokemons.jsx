import React from "react";
import style from "./Pokemons.module.css";

function Pokemon({ name, image, types }) {
  return (
    <div className={style.pokemon}>
      <img src={image} alt={`Pokemon ${name}`} className={style.img} />
      <div className={style.info}>
        <h1 className={style.name}>{name}</h1>
        <h5 className={style.types}>{types}</h5>
      </div>
    </div>
  );
}

export default Pokemon;
