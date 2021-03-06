import React from "react";
import style from "./paginado.module.css";

export default function Paginado({ pokemonsPerPage, pokemons, paginado }) {
  const pageNumbers = [];

  for (let i = 0; i < Math.ceil(pokemons / pokemonsPerPage); i++) {
    pageNumbers.push(i + 1);
  }

  return (
    <div className={style.generalContainer}>

      {pageNumbers &&
        pageNumbers.map((n, i) => (
          <div className={style.numbers_container} key={i}>
            <button
              onClick={() => paginado(n)}
              key={i}
              className={style.button}
            >
              {n}
            </button>
          </div>
        ))}
    </div>
  );
}
