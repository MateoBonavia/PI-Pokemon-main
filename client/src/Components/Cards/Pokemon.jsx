import React from "react";
import style from "./Pokemons.module.css";

function Pokemon({ name, img, types, createInDb }) {
  let tipoDb = createInDb
    ? types.map((e, i) => {
        const nameType = e.name;
        return <h5 key={i}>{nameType}</h5>;
      })
    : types.map((e, i) => {
        return <h5 key={i}>{e}</h5>;
      });

  return (
    <div className={style.pokemon}>
      <img src={img} alt={`Pokemon ${name}`} className={style.img} />
      <div className={style.info}>
        <h1 className={style.name}>{name}</h1>
      </div>
      <div className={style.typeContainer}>{tipoDb}</div>
    </div>
  );
}

export default Pokemon;
