import React from "react";
import "./TileStyle.css";

const closedTileColor = (status, color) => {
  if (status === "active")
    return "tile";
  else if (status === "chosen")
    return "chosen";
  else return "disabled";
}


const Tile = ({ props, setSelectedTile }) => {
  return <figure
    className={closedTileColor(props.status, props.color)}
    style={props.status === "chosen" ? { backgroundColor: props.color } : null}
    onClick={() => { if (props.status !== "disabled") setSelectedTile(props.id, props.color) }}
  />
}

export default Tile;