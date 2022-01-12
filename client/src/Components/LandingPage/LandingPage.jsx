import React from "react";
import { Link } from "react-router-dom";
// import Fondo from "./homepage.png";
import style from "./LandingPage.module.css";

export default function homepage() {
  return (
    <div className={style.principal}>
      <h1 className={style.text}>Welcome to my Pokedex</h1>
      <Link to="/home" className={style.button}>
        <button>Start</button>
      </Link>
    </div>
  );
}
