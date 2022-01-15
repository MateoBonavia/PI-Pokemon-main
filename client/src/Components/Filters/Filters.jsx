import React from "react";
// import { useDispatch } from "react-redux";
import style from "./filters.module.css";

export default function Filters() {
  // const dispatch = useDispatch();

  return (
    <div className={style.filtersContainer}>
      <select>
        <option>Abc</option>
        <option value="asc">Ascending A-Z</option>
        <option value="desc">Descending A-Z</option>
      </select>

      <select>
        <option>Strength</option>
        <option value="high">High strength</option>
        <option value="low">Low strength</option>
      </select>

      <select>
        <option value="All">All</option>
        <option value="pokedex">Pokedex</option>
        <option value="created">Created</option>
      </select>
    </div>
  );
}
