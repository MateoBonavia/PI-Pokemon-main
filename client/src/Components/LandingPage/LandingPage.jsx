import React from "react";
import { Link } from "react-router-dom";
import style from "./LandingPage.module.css";
import imagen from "./pokemon.png";

export default function homepage() {
  return (
    <div className={style.principal}>
      <img src={imagen} className={style.img} alt="imagen" />
      <h1 className={style.text}>Welcome to my Pokedex</h1>
      <Link to="/home" className={style.button}>
        <button>Start</button>
      </Link>
    </div>
  );
}
