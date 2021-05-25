
let context;

export function setCanvases( new_context){
    context = new_context;
}

function setPixel(x,y){
    let p = context.createImageData(1,1);
    p.data[0]=0;
    p.data[1]=0;
    p.data[2]=0;
    p.data[3]=255;
    context.putImageData(p, x, y);
};

// export function DirectMethod(x0,y0,x1,y1,x2,y2,x3,y3, t) {
//     x = ((1-t)**3)*x0 + 3*(1-t)**2*t*x1 + 3*(1-t)*t**2*x2 + t**3*x3;
//     y = ((1-t)**3)*y0 + 3*(1-t)**2*t*y1 + 3*(1-t)*t**2*y2 + t**3*y3;
// }

function Fuctorial(n) // Функция вычисления факториала
{
    let res = 1;
    for (let i = 1; i <= n; i++)
        res *= i;
    return res;
}
function polinom ( i, n, t)// Функция вычисления полинома Бернштейна
    {
    return (Fuctorial(n)/(Fuctorial(i) * Fuctorial(n - i)))* Math.pow(t, i) * Math.pow(1 - t, n - i);
    }
export function DirectMethod(Arr)// Функция рисования кривой
{
    let j = 0;
    let step = 0.001;// Возьмем шаг 0.01 для большей точности

    let result = [];//Конечный массив точек кривой
    for (let t = 0; t < 1; t += step)
    {
        let ytmp = 0;
        let xtmp = 0;
        for (let i = 0; i < Arr.length; i++)
        { // проходим по каждой точке
            let b = polinom(i, Arr.length - 1, t); // вычисляем наш полином Бернштейна
            xtmp += Arr[i].x * b; // записываем и прибавляем результат
            ytmp += Arr[i].y * b;
        }
        
        result[j] = {x: xtmp, y: ytmp};
        j++;

    }
    for (let i = 0; i < result.length; i++){
        setPixel(result[i].x, result[i].y);
    };// Рисуем полученную кривую Безье
}
// export function DirectMethod(x0, y0, x1, y1, x2, y2)
// {                                  /* plot a limited quadratic Bezier segment */
//   var sx = x2-x1, sy = y2-y1;
//   var xx = x0-x1, yy = y0-y1, xy;               /* relative values for checks */
//   var dx, dy, err, cur = xx*sy-yy*sx;                            /* curvature */


//   if (sx*sx+sy*sy > xx*xx+yy*yy) {                 /* begin with shorter part */
//     x2 = x0; x0 = sx+x1; y2 = y0; y0 = sy+y1; cur = -cur;       /* swap P0 P2 */
//   }
//   if (cur != 0) {                                         /* no straight line */
//     xx += sx; xx *= sx = x0 < x2 ? 1 : -1;                /* x step direction */
//     yy += sy; yy *= sy = y0 < y2 ? 1 : -1;                /* y step direction */
//     xy = 2*xx*yy; xx *= xx; yy *= yy;               /* differences 2nd degree */
//     if (cur*sx*sy < 0) {                                /* negated curvature? */
//       xx = -xx; yy = -yy; xy = -xy; cur = -cur;
//     }
//     dx = 4.0*sy*cur*(x1-x0)+xx-xy;                  /* differences 1st degree */
//     dy = 4.0*sx*cur*(y0-y1)+yy-xy;
//     xx += xx; yy += yy; err = dx+dy+xy;                     /* error 1st step */
//     do {
//       setPixel(x0,y0);                                          /* plot curve */
//       if (x0 == x2 && y0 == y2) return;       /* last pixel -> curve finished */
//       y1 = 2*err < dx;                       /* save value for test of y step */
//       if (2*err > dy) { x0 += sx; dx -= xy; err += dy += yy; }      /* x step */
//       if (    y1    ) { y0 += sy; dy -= xy; err += dx += xx; }      /* y step */
//     } while (dy < 0 && dx > 0);        /* gradient negates -> algorithm fails */
//   }
// //   BresenhamLine(x0,y0, x2,y2);                       /* plot remaining part to end */
// }
// 
export default function BresenhamLine(x, y, x1, y1) {
    var dx = Math.abs(x1 - x);
    var dy = Math.abs(y1 - y);
    var sx = (x < x1) ? 1 : -1;
    var sy = (y < y1) ? 1 : -1;
    var err = dx - dy;
 
    while(true) {
       setPixel(x, y); // Do what you need to for this
 
        if ((x === x1) && (y === y1))
            break;
        let e2 = 2*err;
        if (e2 > -dy) {
            err -= dy;
            x  += sx;
        }
       if (e2 < dx) {
            err += dx;
            y  += sy;
         }
    }
}

export function BresenhamCircle(xm, ym, r)
{
   var x = -r, y = 0, err = 2-2*r;                /* bottom left to top right */
   do {
      setPixel(xm-x, ym+y);                            /*   I. Quadrant +x +y */
      setPixel(xm-y, ym-x);                            /*  II. Quadrant -x +y */
      setPixel(xm+x, ym-y);                            /* III. Quadrant -x -y */
      setPixel(xm+y, ym+x);                            /*  IV. Quadrant +x -y */
      r = err;                                       
      if (r <= y) err += ++y*2+1;                                   /* y step */
      if (r > x || err > y) err += ++x*2+1;                         /* x step */
   } while (x < 0);
}

export function DDA(x0, y0, x1, y1)
{
    const dx = x1 - x0,
          dy = y1 - y0,
          s  = Math.abs(dx) > Math.abs(dy) ? Math.abs(dx) : Math.abs(dy),
          xi = dx * 1.0 / s,
          yi = dy * 1.0 / s
 
    var x  = x0,
        y  = y0;
         
    setPixel(x0, y0);
 
    for (var i = 0; i < s; i++) {
        x += xi;
        y += yi;
        setPixel(x, y);
    }
}

// function ellipse(xm, ym, a, b)
// {
//    var x = -a, y = 0;           /* II. quadrant from bottom left to top right */
//    var e2, dx = (1+2*x)*b*b;                              /* error increment  */
//    var dy = x*x, err = dx+dy;                              /* error of 1.step */

//    do {
//        setPixel(xm-x, ym+y);                                 /*   I. Quadrant */
//        setPixel(xm+x, ym+y);                                 /*  II. Quadrant */
//        setPixel(xm+x, ym-y);                                 /* III. Quadrant */
//        setPixel(xm-x, ym-y);                                 /*  IV. Quadrant */
//        e2 = 2*err;                                        
//        if (e2 >= dx) { x++; err += dx += 2*b*b; }                   /* x step */
//        if (e2 <= dy) { y++; err += dy += 2*a*a; }                   /* y step */
//    } while (x <= 0);

//    while (y++ < b) {            /* too early stop for flat ellipses with a=1, */
//        setPixel(xm, ym+y);                        /* -> finish tip of ellipse */
//        setPixel(xm, ym-y);
//    }
// }