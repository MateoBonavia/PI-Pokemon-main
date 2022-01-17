import React from "react";
import style from "./Error.module.css";

function Error() {
  return (
    <div className={style.oopss}>
      <div className={style.error - text}>
        <span>404</span>
        <p>PAGE NOT FOUND</p>
        <p className={style.hmpg}>
          <a href="/home" className={style.back}>
            Back To Home
          </a>
        </p>
      </div>
    </div>
  );
}

export default Error;
