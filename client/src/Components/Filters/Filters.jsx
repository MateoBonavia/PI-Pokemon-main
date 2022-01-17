import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import style from "./filters.module.css";
import { getTypes } from "../../store/actions";
import { useEffect } from "react";
import {
  filterType,
  filterCreated,
  orderName,
  orderStrength,
} from "../../store/actions";

export default function Filters() {
  const dispatch = useDispatch();

  const types = useSelector((state) => state.types);

  useEffect(() => {
    dispatch(getTypes());
  }, [dispatch]);

  function handleFilterType(e) {
    e.preventDefault();
    dispatch(filterType(e.target.value));
  }

  function handleFilterCreated(e) {
    e.preventDefault();
    dispatch(filterCreated(e.target.value));
  }

  function handleSortName(e) {
    e.preventDefault();
    dispatch(orderName(e.target.value));
  }

  function handleSortStength(e) {
    e.preventDefault();
    dispatch(orderStrength(e.target.value));
  }

  return (
    <div className={style.filtersContainer}>
      <select onChange={(e) => handleSortName(e)} className={style.select}>
        <option value="def">Default</option>
        <option value="asc">Ascending A-Z</option>
        <option value="desc">Descending Z-A</option>
      </select>

      <select onChange={(e) => handleFilterType(e)} className={style.select}>
        <option value="All">Filter Type</option>
        {types.map((t, i) => {
          return (
            <option value={t.name} key={i}>
              {t.name.charAt(0).toUpperCase() + t.name.slice(1)}
            </option>
          );
        })}
      </select>

      <select className={style.select} onChange={(e) => handleSortStength(e)}>
        <option value="def">Strength</option>
        <option value="high">High strength</option>
        <option value="low">Low strength</option>
      </select>

      <select onChange={(e) => handleFilterCreated(e)} className={style.select}>
        <option value="All">All</option>
        <option value="pokedex">Pokedex</option>
        <option value="created">Created</option>
      </select>
    </div>
  );
}
