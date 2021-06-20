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

// нецелочисленные
export function lineNotInt(p1, p2) {
  let x = 0; // Канонический случай: начальная точка
  let y = 0; // лежит в [0, 1) (+)  [0, 1)

  /* Приращения t, соответствующие смещениям от начальной
  точки до границ первого пикселя. */
  let a = Math.round(p2.x - p1.x);
  let b = Math.round(p2.y - p1.y);
  let x_mnoj = 1,
    y_mnoj = 1;

  /*
   * Т.к. линии могут быть \ | / -, а рисование у нас
   * происходит в 1 октанте, то необходимо уставновить направление
   * при x_mnoj = -1, конечная точка по х (B) левее начальной (A)
   * при y_mnoj = -1, конечная точка по y (B) выше начальной (A)
   * [т.к. в js холст рисует]
   * x3|x2
   * -----
   * x4|x1
   *
   * Далее просто берем наши исходные координаты
   * (x*coef+p1.x, y*coef+p1.y)
   */

  if (a < 0) {
    x_mnoj = -1;
  }
  if (b < 0) {
    y_mnoj = -1;
  }

  let c = 1000;
  // величина сдвига по горизонтали
  let dh = c / Math.abs(p2.x - p1.x);
  let h = 0;
  // величина сдвига по вертикали
  let dv = c / Math.abs(p2.y - p1.y);
  let v = 0;

  while (h < c && v < c) {
    setPixel(x * x_mnoj + Math.round(p1.x), y * y_mnoj + Math.round(p1.y));
    if (h < v) {
      // Сдвиг по горизонтали
      x++;
      h += dh;
    } else if (h > v) {
      // Сдвиг по вертикали
      y++;
      v += dv;
    } else {
      // h = v : Вырожденный случай (см. рис. 3.5)
      // рисуем произвольный из двух возможных пикселей,
      // например, верхний:
      setPixel(
        x * x_mnoj + Math.round(p1.x),
        (y + 1) * y_mnoj + Math.round(p1.y)
      );
      x++;
      y++;
      h += dh;
      v += dv;
    }
  }
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
  // Рисуем полученную кривую Безье
  for (let i = 0; i < result.length; i++) {
    setPixel(result[i].x, result[i].y);
  }
}

// Линия брезенхема
export default function BresenhamLine(x, y, x1, y1) {
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
// Цифровой анализатор
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
// окружность брезенхейма
export function BresenhamCircle(xm, ym, r) {
  let x = -r,
    y = 0,
    delta = 2 - 2 * r;
  console.log(delta);
  do {
    setPixel(xm - x, ym + y);
    setPixel(xm - y, ym - x);
    setPixel(xm + x, ym - y);
    setPixel(xm + y, ym + x);

    if (delta <= y) {
      delta += ++y * 2 + 1; /* y шаг */
    }
    if (delta > x || delta > y) {
      delta += ++x * 2 + 1;
    } /* x шаг */
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

// Метод отсечения "Средняя точка"
function isInside(p) {
  let r = rectangle;
  return r[0].x <= p.x && r[1].x >= p.x && r[0].y <= p.y && r[1].y >= p.y;
}

export function middlePoint(p1, p2) {
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

let points = [];
let p1, p2;

export function setPoints(front_points) {
  points = front_points;
  for (let i = 0; i < points.length - 1; i++) {
    p1 = points[i];
    p2 = points[i + 1];
    BresenhamLine(p1.x, p1.y, p2.x, p2.y);
  }
  p1 = points[points.length - 1];
  p2 = points[0];
  BresenhamLine(p1.x, p1.y, p2.x, p2.y);
  console.log("end printing");
}

// Алгоритм кирус бека
export function cyrusBeck(x1, y1, x2, y2) {
  var k = points.length;
  var d = [x2 - x1, y2 - y1];
  var f = points;
  let px, py, px1, py1;
  var normals = [];
  var w;
  var n = points.length;
  var tl = 0;
  var tu = 1;
  var Ddotn, Wdotn, t;

  //finding normals
  for (let i = 0; i < n; i++) {
    normals.push([
      points[i % n].y - points[(i + 1) % n].y,
      [points[(i + 1) % n].x - points[i % n].x],
    ]);
  }

  console.log(points);

  for (let i = 0; i < k; i++) {
    w = [x1 - f[i].x, y1 - f[i].y];

    Ddotn = dotProduct(d, normals[i]);
    Wdotn = dotProduct(w, normals[i]);

    if (Ddotn !== 0) {
      t = -Wdotn / Ddotn;

      if (Ddotn > 0) {
        if (t > 1) {
          return;
        } else {
          tl = Math.max(t, tl);
        }
      } else {
        if (t < 0) {
          return;
        } else {
          tu = Math.min(t, tu);
        }
      }
    } else {
      if (Wdotn < 0) {
        return;
      }
    }
  }
  if (tl <= tu) {
    px = x1 + (x2 - x1) * tl;
    py = y1 + (y2 - y1) * tl;
    px1 = x1 + (x2 - x1) * tu;
    py1 = y1 + (y2 - y1) * tu;
  }
  console.log({ px, py, px1, py1 });
  BresenhamLine(
    Math.floor(px),
    Math.floor(py),
    Math.floor(px1),
    Math.floor(py1)
  );
}

function dotProduct(p1, p2) {
  var res = 0;

  for (var i = 0; i < 2; i++) {
    res += p1[i] * p2[i];
  }

  return res;
}
