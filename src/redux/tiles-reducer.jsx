const TILE_SELECTED = "TILE_SELECTED";
const START_ROUND = "START_ROUND";

let randomInteger = (min, max) => {
  let rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
}



let stateInit = {
  tiles: [
    { id: 0, status: "active", color: "orange" },
    { id: 1, status: "active", color: "purple" },
    { id: 2, status: "active", color: "yellow" },
    { id: 3, status: "active", color: "aqua" },
    { id: 4, status: "active", color: "blue" },
    { id: 5, status: "active", color: "orange" },
    { id: 6, status: "active", color: "blue" },
    { id: 7, status: "active", color: "pink" },
    { id: 8, status: "active", color: "green" },
    { id: 9, status: "active", color: "pink" },
    { id: 10, status: "active", color: "lime" },
    { id: 11, status: "active", color: "aqua" },
    { id: 12, status: "active", color: "yellow" },
    { id: 13, status: "active", color: "purple" },
    { id: 14, status: "active", color: "lime" },
    { id: 15, status: "active", color: "green" },
  ],
  selectedTile: -1,
  gameOvers: 0,
  winMessage: "Победа!",
}

const tilesReducer = (state = stateInit, action) => {
  switch (action.type) {
    case TILE_SELECTED: {
      if (state.selectedTile == -1) {
        return ({
          ...state,
          tiles: state.tiles.map(t => {
            if (t.id === action.id) {
              t.status = "chosen";
              return t;
            } else return t;
          }),
          selectedTile: action.id
        });
      } else if (state.selectedTile === action.id) {
        return {
          ...state,
          tiles: state.tiles.map(t => {
            if (t.id === action.id) {
              t.status = "active";
              return t;
            } else return t;
          }),
          selectedTile: -1,
        }
      } else if (state.selectedTile !== action.id
        &&
        state.tiles[state.selectedTile].color === state.tiles[action.id].color) {
        state.selectedTile = -1;
        return {
          ...state,
          tiles: state.tiles.map(t => {
            if (t.color == action.color) {
              t.status = "disabled";
              return t;
            } else return t;
          })
        }
      }
      else if (state.selectedTile !== action.id
        &&
        state.tiles[state.selectedTile].color !== state.tiles[action.id].color) {
        let colors = [
          { color: "blue", counter: 0 },
          { color: "yellow", counter: 0 },
          { color: "green", counter: 0 },
          { color: "purple", counter: 0 },
          { color: "orange", counter: 0 },
          { color: "lime", counter: 0 },
          { color: "aqua", counter: 0 },
          { color: "pink", counter: 0 }
        ]
        let newArray = [];
        for (let i = 0; i < 16; i++) {
          colors.forEach(c => { if (c.counter < 1) return c; })
          let rand = randomInteger(0, colors.length - 1)
          if (colors[rand].counter < 2) {
            newArray.push({ id: i, status: "active", color: colors[rand].color });
            colors[rand].counter++;
          } else i--;
          console.log(newArray)
        }
        return { ...state, selectedTile: -1, tiles: newArray };
      }
    }
    default: return state;
  }
}

export const setSelectedTile = (tileId, color) => ({ type: TILE_SELECTED, id: tileId, color });

export default tilesReducer;