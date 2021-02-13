const randomInteger = (min, max) => {
  let rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
};

export const changeStatus = (arr, key, status) => {
  return arr.map((t) => {
    if (t.id === key) {
      t.status = status;
      return t;
    } else return t;
  })
}
export const statusCloseTiles = (arr, id_1, id_2, status) => {
  return arr.map((t) => {
    if (t.id === id_1 || t.id === id_2) {
      t.status = status;
      return t;
    } else return t;
  })
}
export const getRandomRounds = () => {
  const newArray = [];
  for (let i = 0; i < 3; i++) {
    let colors = [
      { color: "blue", counter: 0 },
      { color: "yellow", counter: 0 },
      { color: "green", counter: 0 },
      { color: "purple", counter: 0 },
      { color: "orange", counter: 0 },
      { color: "lime", counter: 0 },
      { color: "aqua", counter: 0 },
      { color: "pink", counter: 0 }
    ];
    let ColorsOnRound = [];
    for (let j = 0; j < 16; j++) {
      let rand = randomInteger(0, colors.length - 1);
      if (colors[rand].counter < 2) {
        ColorsOnRound.push({
          id: j,
          status: "active",
          color: colors[rand].color
        });
        colors[rand].counter++;
      } else {
        colors.forEach((c) => {
          if (c.counter <= 1) return c;
        });
        j--;
      }
    }
    newArray.push(ColorsOnRound);
  }
  return newArray;
}