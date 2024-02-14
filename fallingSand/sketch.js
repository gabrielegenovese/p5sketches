let grid = [];

let colorVal = 1;

let w = 5;
let width = 400;
let height = 400;

function makeArray() {
  let arr = [];
  let tot = floor(width / w);
  for (let i = 0; i < tot; i++) {
    arr[i] = [];
    for (let j = 0; j < tot; j++) {
      arr[i][j] = 0;
    }
  }
  return arr;
}

function setup() {
  createCanvas(width, height);
  colorMode(RGB, 255, 255, 255);
  grid = makeArray();
}

function draw() {
  if (random(1) > 0.5) {
    grid[0][floor(grid.length / 2)] = 1;
  }

  for (let i = 0; i < grid.length; i++) {
    let g = grid[i];
    for (let j = 0; j < g.length; j++) {
      noStroke();
      if (grid[i][j] == 1) {
        fill(0, 0, 0);
      } else {
        fill(255, 255, 255);
      }

      square(j * w, i * w, w);
    }
  }

  let nextGrid = makeArray();
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      let state = grid[i][j];

      if (state == 1) {
        if (i + 1 < grid.length) {
          let below = grid[i + 1][j];
          let right = grid[i + 1][j + 1];
          let left = grid[i + 1][j - 1];
          if (below === 0) {
            nextGrid[i + 1][j] = 1;
          } else {
            if (left === 0 && right === 0) {
              if (random(1) > 0.5) {
                nextGrid[i][j - 1] = state;
              } else {
                nextGrid[i][j + 1] = state;
              }
            } else if (left === 0) {
              nextGrid[i][j - 1] = state;
            } else if (right === 0) {
              nextGrid[i][j + 1] = state;
            } else {
              nextGrid[i][j] = state;
            }
          }
        } else {
          nextGrid[i][j] = state;
        }
      }
    }
  }
  grid = nextGrid;
}

