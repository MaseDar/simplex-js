let context;
let LEFT = 1,
  RIGHT = 2,
  BOT = 4,
  TOP = 8;

let rectangle = [
  { x: 0, y: 0 },
  { x: 0, y: 0 },
];
export function setCanvases(new_context) {
  context = new_context;
}

function setPixel(x, y) {
  let p = context.createImageData(1, 1);
  p.data[0] = 0;
  p.data[1] = 0;
  p.data[2] = 0;
  p.data[3] = 255;
  context.putImageData(p, x, y);
}

// Функция вычисления факториала
function Fuctorial(n) {
  let res = 1;
  for (let i = 1; i <= n; i++) res *= i;
  return res;
}
// Функция вычисления полинома Бернштейна
function polinom(i, n, t) {
  return (
    (Fuctorial(n) / (Fuctorial(i) * Fuctorial(n - i))) *
    Math.pow(t, i) *
    Math.pow(1 - t, n - i)
  );
}
// Функция рисования кривой Безье
export function DirectMethod(Arr) {
  let j = 0;
  // Возьмем шаг 0.001 для большей точности
  let step = 0.001;

  let result = []; //Конечный массив точек кривой
  for (let t = 0; t < 1; t += step) {
    let ytmp = 0;
    let xtmp = 0;
    // проходим по каждой точке
    for (let i = 0; i < Arr.length; i++) {
      let b = polinom(i, Arr.length - 1, t); // вычисляем наш полином Бернштейна
      xtmp += Arr[i].x * b; // записываем и прибавляем результат
      ytmp += Arr[i].y * b;
    }

    result[j] = { x: xtmp, y: ytmp };
    j++;
  }
  for (let i = 0; i < result.length; i++) {
    setPixel(result[i].x, result[i].y);
  } // Рисуем полученную кривую Безье
}

export default function BresenhamLine(x, y, x1, y1) {
  var dx = Math.abs(x1 - x);
  var dy = Math.abs(y1 - y);
  var sx = x < x1 ? 1 : -1;
  var sy = y < y1 ? 1 : -1;
  var err = dx - dy;

  while (true) {
    setPixel(x, y); // Do what you need to for this

    if (x === x1 && y === y1) break;
    let e2 = 2 * err;
    if (e2 > -dy) {
      err -= dy;
      x += sx;
    }
    if (e2 < dx) {
      err += dx;
      y += sy;
    }
  }
}
export function DDA(x0, y0, x1, y1) {
  const dx = x1 - x0,
    dy = y1 - y0,
    s = Math.abs(dx) > Math.abs(dy) ? Math.abs(dx) : Math.abs(dy),
    xi = (dx * 1.0) / s,
    yi = (dy * 1.0) / s;

  var x = x0,
    y = y0;

  setPixel(x0, y0);

  for (var i = 0; i < s; i++) {
    x += xi;
    y += yi;
    setPixel(x, y);
  }
}

export function BresenhamCircle(xm, ym, r) {
  var x = -r,
    y = 0,
    err = 2 - 2 * r; /* bottom left to top right */
  do {
    setPixel(xm - x, ym + y); /*   I. Quadrant +x +y */
    setPixel(xm - y, ym - x); /*  II. Quadrant -x +y */
    setPixel(xm + x, ym - y); /* III. Quadrant -x -y */
    setPixel(xm + y, ym + x); /*  IV. Quadrant +x -y */
    r = err;
    if (r <= y) err += ++y * 2 + 1; /* y step */
    if (r > x || err > y) err += ++x * 2 + 1; /* x step */
  } while (x < 0);
}

function getCode(dot) {
  let code = 0;
  if (dot.x < rectangle[0].x) code += LEFT;
  else if (dot.x > rectangle[1].x) code += RIGHT;
  if (dot.y < rectangle[0].y) code += BOT;
  else if (dot.y > rectangle[1].y) code += TOP;
  return code;
}

export function RectangleForCohenSutherland(x0, y0, x1, y1) {
  // рисуем окошко для визаулизации
  rectangle[0].x = x0;
  rectangle[0].y = y0;
  rectangle[1].x = x1;
  rectangle[1].y = y1;
  context.strokeRect(x0, y0, x1 - x0, y1 - y0);
}

export function CohenSutherland(x0, y0, x1, y1) {
  let p1 = { x: x0, y: y0 };
  let p2 = { x: x1, y: y1 };
  console.log("start", p1, p2);
  let p = {};

  let code;
  let codeA = getCode(p1);
  let codeB = getCode(p2);

  while (codeA | codeB) {
    // Ебать я гений нахуй, надо чистить жопу...
    if (codeA & codeB) return;

    if (codeA | 0) {
      code = codeA;
      p = p1;
    } else {
      code = codeB;
      p = p2;
    }

    if (code & LEFT) {
      p.y += ((p1.y - p2.y) * (rectangle[0].x - p.x)) / (p1.x - p2.x);
      p.x = rectangle[0].x;
    } else if (code & RIGHT) {
      p.y += ((p1.y - p2.y) * (rectangle[1].x - p.x)) / (p1.x - p2.x);
      p.x = rectangle[1].x;
    } else if (code & BOT) {
      p.x += ((p1.x - p2.x) * (rectangle[0].y - p.y)) / (p1.y - p2.y);
      p.y = rectangle[0].y;
    } else if (code & TOP) {
      p.x += ((p1.x - p2.x) * (rectangle[1].y - p.y)) / (p1.y - p2.y);
      p.y = rectangle[1].y;
    }

    if (code === codeA) {
      p1 = p;
      codeA = getCode(p1);
    } else {
      p2 = p;
      codeB = getCode(p2);
    }
  }
  BresenhamLine(
    Math.floor(p1.x),
    Math.floor(p1.y),
    Math.floor(p2.x),
    Math.floor(p2.y)
  );
  console.log("lend", p1, p2);
}

function isInside(p) {
  let r = rectangle;
  return r[0].x <= p.x && r[1].x >= p.x && r[0].y <= p.y && r[1].y >= p.y;
}
export function middlePoint(p1, p2) {
  // заглушка, но он работает.
  if (Math.abs(p1.x - p2.x) <= 1 && Math.abs(p1.y - p2.y) <= 1) return;
  if (isInside(p1) && isInside(p2)) {
    BresenhamLine(
      Math.floor(p1.x),
      Math.floor(p1.y),
      Math.floor(p2.x),
      Math.floor(p2.y)
    );
    console.log("paint");
    return;
  }

  let codeA = getCode(p1);
  let codeB = getCode(p2);
  if (codeA & codeB) return;

  middlePoint(p1, { x: (p1.x + p2.x) / 2, y: (p1.y + p2.y) / 2 });
  middlePoint({ x: (p1.x + p2.x) / 2, y: (p1.y + p2.y) / 2 }, p2);
}
