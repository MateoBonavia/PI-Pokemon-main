import React from "react";

export default function Filters() {
  return (
    <div>
      <select>
        <option>Filter by...</option>
        <option>Ascending A-Z</option>
        <option>Descending A-Z</option>
        <option>High strength</option>
        <option>Low strength</option>
      </select>

      <select>
        <option>All</option>
        <option>Pokedex</option>
        <option>Created</option>
      </select>
    </div>
  );
}
