import React from "react";
import Tile from "./Tile";
import { connect } from "react-redux";
import "./TileStyle.css";
import { setSelectedTile, gameStart, matchTileThunk, nextRound } from "../redux/tiles-reducer";


class TilesContainer extends React.Component {
  componentDidMount() {
    this.props.gameStart();
  }
  compareTiles = (id) => {
    if (!this.props.state.showing) {
      (this.props.state.selectedTile === -1 || this.props.state.selectedTile === id) ?
        this.props.setSelectedTile(id) :
        this.props.matchTileThunk(id, this.props.state.foundPairs);
    }
  }
  render() {
    if (this.props.state.currentRound < 10) {
      return <div className="tiles">
        {
          this.props.state.AllRoundTiles[0] ?
            this.props.state.AllRoundTiles[this.props.state.currentRound].map(t => {
              return <Tile
                key={t.id}
                props={t}
                selectTile={this.compareTiles}
              />
            }) : null
        }
        <span>Round {this.props.state.currentRound + 1}</span>
      </div>
    } else return <h1>You win!</h1>
  }
}

let mapStateToProps = (state) => ({ state })

export default connect(mapStateToProps, { setSelectedTile, gameStart, matchTileThunk, nextRound })(TilesContainer)