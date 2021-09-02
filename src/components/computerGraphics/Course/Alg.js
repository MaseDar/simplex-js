let points1 = [];
let points2 = [];
let context;
export function setCanvases(new_context) {
  context = new_context;
}

export default function printFirst(points) {
  points1 = points;
  for (let i = 0; i < points1.length; i++) {
    if (i === points1.length - 1) {
      line(points1[i], points1[0]);
    } else {
      line(points1[i], points1[i + 1]);
    }
  }
}

export function printSecond(points) {
  points2 = points;
  for (let i = 0; i < points2.length; i++) {
    if (i === points2.length - 1) {
      line(points1[i], points1[0]);
    } else {
      line(points2[i], points2[i + 1]);
    }
  }
}

function setPixel(x, y) {
  let p = context.createImageData(1, 1);
  p.data[0] = 0;
  p.data[1] = 0;
  p.data[2] = 0;
  p.data[3] = 255;
  context.putImageData(p, x, y);
}
export function interpol(e) {}

// Линия брезенхема
function line(p1, p2) {
  let x = Math.floor(p1.x);
  let y = Math.floor(p1.y);
  let x1 = Math.floor(p2.x);
  let y1 = Math.floor(p2.y);

  var dx = Math.abs(x1 - x);
  var dy = Math.abs(y1 - y);
  var sx = x < x1 ? 1 : -1;
  var sy = y < y1 ? 1 : -1;
  var delta = dx - dy;

  while (true) {
    setPixel(x, y);
    if (x === x1 && y === y1) break;
    let e2 = 2 * delta;
    if (e2 > -dy) {
      delta -= dy;
      x += sx;
    }
    if (e2 < dx) {
      delta += dx;
      y += sy;
    }
  }
}

function line2(p1, p2, rec) {
  let x = Math.floor(p1.x);
  let y = Math.floor(p1.y);
  let x1 = Math.floor(p2.x);
  let y1 = Math.floor(p2.y);

  var dx = Math.abs(x1 - x);
  var dy = Math.abs(y1 - y);
  var sx = x < x1 ? 1 : -1;
  var sy = y < y1 ? 1 : -1;
  var delta = dx - dy;

  while (true) {
    setPixel(x, y);
    context.strokeRect(
      rec.p1.x + x,
      rec.p1.y + y,
      rec.p2.x - rec.p1.x + x,
      rec.p1.y - rec.p1.y + y
    );
    if (x === x1 && y === y1) break;
    let e2 = 2 * delta;
    if (e2 > -dy) {
      delta -= dy;
      x += sx;
    }
    if (e2 < dx) {
      delta += dx;
      y += sy;
    }
  }
}
