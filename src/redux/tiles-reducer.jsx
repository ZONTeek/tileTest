import { changeStatus, statusCloseTiles, getRandomRounds } from "../helperFunctions";

const TILE_SELECT = "TILE_SELECT";
const GAME_START = "GAME_START";
const COMPARE = "COMPARE";
const OPEN_TILE = "OPEN_TILE";
const SHOWING_TILE = "SHOWING_TILE";
const NEXT_ROUND = "NEXT_ROUND";


let stateInit = {
  AllRoundTiles: [], // Contains arrays with tiles on round
  currentTiles: [],
  selectedTile: -1,
  currentRound: 0,
  showing: false, // block clicks on others tile while showing chosen tiles
  foundPairs: 0,
};

const tilesReducer = (state = stateInit, action) => {
  switch (action.type) {
    case TILE_SELECT: {
      switch (state.selectedTile) {
        case -1: { //first tile isn't chosen, save id of tile
          return ({
            ...state,
            currentTiles: changeStatus(state.currentTiles, action.id, "chosen"),
            selectedTile: action.id,
          })
        };
        case action.id: { //first and second tile match
          return {
            ...state,
            currentTiles: changeStatus(state.currentTiles, action.id, "active"),
            selectedTile: -1,
          }
        }
        default: return { ...state, selectedTile: -1 }
      }
    }
    case COMPARE: {
      if (state.currentTiles[action.id].color === state.currentTiles[state.selectedTile].color
        &&
        state.selectedTile !== -1) { //colors of two different chosen tiles are match 
        return {
          ...state,
          currentTiles: statusCloseTiles(state.currentTiles, state.selectedTile, action.id, "disabled"),
          selectedTile: -1,
          foundPairs: state.foundPairs + 1,
        }
      } else return { //colors don't match, return to closed state
        ...state,
        currentTiles: statusCloseTiles(state.currentTiles, state.selectedTile, action.id, "active"),
        selectedTile: -1,
      }
    }
    case OPEN_TILE:
      return ({
        ...state,
        currentTiles: changeStatus(state.currentTiles, action.id, "chosen"),
      })
    case SHOWING_TILE: return { ...state, showing: !state.showing }
    case GAME_START: {
      let AllRoundTiles = getRandomRounds()
      return { ...state, AllRoundTiles: AllRoundTiles, currentTiles: AllRoundTiles[0] }
    }
    case NEXT_ROUND: {
      if (state.currentRound < 3) return {
        ...state,
        currentRound: state.currentRound + 1,
        currentTiles: state.AllRoundTiles[state.currentRound + 1],
        foundPairs: 0,
      }
    }
    default: return state;
  }
};

export const matchTileThunk = (id, foundPairs) => dispatch => {
  dispatch(openTile(id));
  dispatch(showingTileToggle());
  setTimeout(() => dispatch(compare(id)), 500);
  setTimeout(() => dispatch(showingTileToggle()), 500);
  if (foundPairs === 7) setTimeout(() => dispatch(nextRound()), 1000);
}

const showingTileToggle = () => ({ type: SHOWING_TILE })
const openTile = (id) => ({ type: OPEN_TILE, id })
const compare = (id) => ({ type: COMPARE, id })

export const setSelectedTile = (id) => ({ type: TILE_SELECT, id });
export const gameStart = () => ({ type: GAME_START, })
export const nextRound = () => ({ type: NEXT_ROUND })

export default tilesReducer;
