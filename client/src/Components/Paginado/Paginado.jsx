import React from "react";
import style from "./paginado.module.css";

export default function Paginado({ pokemonsPerPage, allPokemon, paginado }) {
  const pageNumbers = [];

  for (let i = 0; i < Math.ceil(allPokemon / pokemonsPerPage); i++) {
    pageNumbers.push(i + 1);
  }

  return (
    <div className={style.generalContainer}>
      {pageNumbers &&
        pageNumbers.map((n) => (
          <div className={style.numbers_container}>
            <button
              onClick={() => paginado(n)}
              key={n}
              className={style.button}
            >
              {n}
            </button>
          </div>
        ))}
    </div>
  );
}
