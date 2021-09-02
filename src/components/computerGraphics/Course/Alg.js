let points1 = [];
let points2 = [];
let context;
let c1, c2;
export function setCanvases(new_context) {
  context = new_context;
}

export default function printFirst(points, coef) {
  points1 = points;
  print(points1);
  points1 = minDot(points1);
  print(divide(points1, 50));
}

export function printSecond(points) {
  points2 = points;
  print(points2);
  points2 = minDot(points2);
  print(divide2(points2, 50));
}

function divide2(polygon, coef) {
  let c2 = center(polygon);
  let poly = [];
  let little2 = [];
  polygon.map((p) =>
    poly.push({
      x: p.x * (coef / 100),
      y: p.y * (coef / 100),
    })
  );
  print(poly);

  let c2_1 = center(poly);
  poly.map((p) => {
    let help = {
      x: dist2dot(c2, c1).x * (coef / 100),
      y: dist2dot(c2, c1).y * (coef / 100),
    };
    little2.push({
      x: p.x + sum(dist2dot(c1, c2_1), help).x,
      y: p.y + sum(dist2dot(c1, c2_1), help).y,
    });
    // little2.push({
    //   x: p.x + help.x,
    //   y: p.y + help.y,
    // });
    return p;
  });
  return little2;
}

function sum(p1, p2) {
  return { x: p1.x + p2.x, y: p1.y + p2.y };
}
// маленький полигон
function divide(polygon, coef) {
  c1 = center(polygon);
  let poly = [];
  let newCoords = [];
  polygon.map((p) =>
    poly.push({
      x: p.x * (coef / 100),
      y: p.y * (coef / 100),
    })
  );
  print(poly);
  let c1_1 = center(poly);
  polygon.map((p) =>
    newCoords.push({
      x: p.x * (coef / 100) + dist2dot(c1, c1_1).x,
      y: p.y * (coef / 100) + dist2dot(c1, c1_1).y,
    })
  );
  return newCoords;
}

function print(poly) {
  for (let i = 0; i < poly.length; i++) {
    if (i === poly.length - 1) {
      line(poly[i], poly[0]);
    } else {
      line(poly[i], poly[i + 1]);
    }
  }
}

function center(polygon) {
  let c = { x: 0, y: 0 };
  polygon.map((p) => {
    c.x += p.x;
    c.y += p.y;
    return p;
  });
  c.x = c.x / polygon.length;
  c.y = c.y / polygon.length;
  return c;
}

function dist2dot(p1, p2) {
  return { x: p1.x - p2.x, y: p1.y - p2.y };
}

function dist(p) {
  return Math.sqrt(p.x * p.x + p.y * p.y);
}

function minDot(polygon) {
  let c = { x: polygon[0].x, y: polygon[0].y };
  let idx = 0;
  polygon.map((p, index) => {
    if (dist(p) < dist(c)) {
      c = p;
      idx = index;
    }
    return p;
  });

  let newpol = polygon.slice(idx);
  newpol.push(...polygon.slice(0, idx));
  return newpol;
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
