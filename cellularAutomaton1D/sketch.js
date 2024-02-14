let grid = [];
let rule = 165;
let ruleset = [];
let y = 1;

let colorVal = 1;

let vel = 1;
let w = 5;
let width = 800;
let height = 500;

function setup() {
  createCanvas(width, height);
  colorMode(HSB, 360, 255, 255);
  ruleset = rule.toString(2).padStart(9, "0");
  let tot = width / w + 2;
  for (let i = 0; i < tot; i++) {
    grid[i] = 0;
  }
  grid[floor(tot / 2)] = 1;
  background(255);
}

function draw() {
  if (colorVal > 360) {
    vel *= -1;
  }
  if (colorVal < 0) {
    vel *= -1;
  }
  colorVal += vel;

  if (y > height) {
    rule = floor(random(256));
    console.log(rule);
    y = 0;
    setup();
  }
  for (let i = 0; i < grid.length; i++) {
    let x = i * w - 2 * w;
    noStroke();
    if (grid[i] == 1) {
      fill(colorVal, 255, 255);
    } else {
      fill(0, 0, 0);
    }
    square(x, y, w);
  }
  y += w;

  let nextGrid = [];
  for (let i = 0; i < grid.length; i++) {
    if (i - 1 > 0 && i < width - 1) {
      let l = grid[i - 1];
      let c = grid[i];
      let r = grid[i + 1];
      nextGrid[i] = calcNewState(l, c, r);
    } else {
      nextGrid[i] = grid[i];
    }
  }
  grid = nextGrid;
}

function calcNewState(l, c, r) {
  let n = "" + l + c + r;
  let v = 7 - parseInt(n, 2);
  return ruleset[v];
}

