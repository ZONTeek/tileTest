import React from "react";
import "./TileStyle.css";

const closedTileColor = (status) => {
  if (status === "active")
    return "tile";
  else if (status === "chosen")
    return "chosen";
  else return "disabled";
}


const Tile = ({ props, selectTile }) => {
  return <figure
    className={closedTileColor(props.status)}
    style={props.status === "chosen" ? { backgroundColor: props.color } : null}
    onClick={() => { if (props.status !== "disabled") selectTile(props.id) }}
  />
}

export default Tile;