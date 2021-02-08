import React from "react";
import Tile from "./Tile";
import { connect } from "react-redux";
import "./TileStyle.css";
import { setSelectedTile, startRound } from "../redux/tiles-reducer";


class TilesContainer extends React.Component {
  render() {
    debugger;
    return <div className="tiles">
      {
        this.props.state.tiles.map(t => {
          return <Tile
            key={t.id}
            props={t}
            setSelectedTile={this.props.setSelectedTile}
          />
        })
      }
      <span>{this.props.state.gameOvers}</span>
    </div>
  }
}

let mapStateToProps = (state) => ({ state: state })

export default connect(mapStateToProps, { setSelectedTile })(TilesContainer)