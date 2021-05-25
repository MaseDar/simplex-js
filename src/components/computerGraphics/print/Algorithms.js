
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

// Функция вычисления факториала
function Fuctorial(n) {
    let res = 1;
    for (let i = 1; i <= n; i++)
        res *= i;
    return res;
}
// Функция вычисления полинома Бернштейна
function polinom(i,n,t){
    return (Fuctorial(n)/(Fuctorial(i) * Fuctorial(n - i)))* Math.pow(t, i) * Math.pow(1 - t, n - i);
}
// Функция рисования кривой Безье
export function DirectMethod(Arr){
    let j = 0;
    // Возьмем шаг 0.001 для большей точности
    let step = 0.001; 

    let result = []; //Конечный массив точек кривой
    for (let t = 0; t < 1; t += step){

        let ytmp = 0;
        let xtmp = 0;
         // проходим по каждой точке
        for (let i = 0; i < Arr.length; i++){
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


export function BresenhamCircle(xm, ym, r)
{
   var x = -r, y = 0, err = 2-2*r;                /* bottom left to top right */
   do {
      setPixel(xm-x, ym+y);                            /*   I. Quadrant +x +y */
      setPixel(xm-y, ym-x);                            /*  II. Quadrant -x +y */
      setPixel(xm+x, ym-y);                            /* III. Quadrant -x -y */
      setPixel(xm+y, ym+x);                            /*  IV. Quadrant +x -y */
      r = err;                                       
      if (r <= y)
       err += ++y*2+1;                                   /* y step */
      if (r > x || err > y)
       err += ++x*2+1;                         /* x step */
   } while (x < 0);
}
                // левый верх   правый низ
let rectangle = [{x: 0, y: 0}, {x: 0,y: 0}]

function getCode(dot){
    let res = 0;
    if (dot.x < rectangle[0].x)
        res += 1;
    else if (dot.x > rectangle[1].x)
        res += 4;

    if (dot.y < rectangle[1].y)
        res += 2;
    else if (dot.y > rectangle[0].y)
        res += 8;

    return res;
}


export function RectangleForCohenSutherland(x0, y0, x1, y1){
    // рисуем окошко для визаулизации
    rectangle[0].x = x0;
    rectangle[0].y = y0;
    rectangle[1].x = x1;
    rectangle[1].y = y1;
    context.strokeRect(x0, y0, x1-x0, y1-y0)
}

export function CohenSutherland(x0, y0, x1, y1){
    let p1 = {x:x0, y:y0};
    let p2 = {x:x1, y:y1};
    let p = {}
    let help;
    let a = getCode(p1);
    let b = getCode(p2);
    // while (a!=0 || b!=0){

    //     if ((a & b) != 0){
    //         BresenhamLine(p1.x, p1.y, p2.x, p2.y);
    //         return;
    //     }
    //     // замена
    //     if (a != 0){
    //         help = a;
    //         p = p1;
    //     }
    //     else{
    //         help = b;
    //         p = p2;
    //     }
        
    //     if ((help & 1) !=0){
    //         p.y += (p1.y - p2.y) * (rectangle[0].x - p.x) / (p1.x - p2.x);
    //         p.x = rectangle[0].x;
    //     }
    //     else if ((help & 2)!= 0){
    //         p.y += (p1.y - p2.y) * (rectangle[1].x - p.x) / (p1.x - p2.x);
    //         p.x = rectangle[1].x;
    //     }
    //     else if ((help & 4)!= 0){
    //         p.x += (p1.x - p2.x) * (rectangle[0].y - p.y) / (p1.y - p2.y);
    //         p.y = rectangle[0].y;
    //     }
    //     else if ((help & 8)!=0){
    //         p.x += (p1.x - p2.x) * (rectangle[1].y  - p.y) / (p1.y - p2.y);
    //         p.y = rectangle[1].y;
    //     }

    //     if (help == a){
    //         p1 = p;
    //         a = getCode(p1);
    //     }
    //     else{
    //         p2 = p;
    //         b = getCode(p2);
    //     }
    
    // compute outcodes for P0, P1, and whatever point lies outside the clip rectangle
	let outcode0 = getCode(p1);
	let outcode1 = getCode(p2);
    let x,y;
	while (true) {
		if (!(outcode0 | outcode1)) {
			// bitwise OR is 0: both points inside window; trivially accept and exit loop
			break;
		} else if (outcode0 & outcode1) {
			// bitwise AND is not 0: both points share an outside zone (LEFT, RIGHT, TOP,
			// or BOTTOM), so both must be outside window; exit loop (accept is false)
			break;
		} else {
			// failed both tests, so calculate the line segment to clip
			// from an outside point to an intersection with clip edge

			// At least one endpoint is outside the clip rectangle; pick it.
			let outcodeOut = outcode1 > outcode0 ? outcode1 : outcode0;

			// Now find the intersection point;
			// use formulas:
			//   slope = (y1 - y0) / (x1 - x0)
			//   x = x0 + (1 / slope) * (ym - y0), where ym is ymin or rectangle[0].y
			//   y = y0 + slope * (xm - x0), where xm is xmin or xmax
			// No need to worry about divide-by-zero because, in each case, the
			// outcode bit being tested guarantees the denominator is non-zero
			if (outcodeOut & 8) {           // point is above the clip window
				x = x0 + (x1 - x0) * (rectangle[0].y - y0) / (y1 - y0);
				y = rectangle[0].y;
			} else if (outcodeOut & 4) { // point is below the clip window
				x = x0 + (x1 - x0) * (rectangle[1].y - y0) / (y1 - y0);
				y = rectangle[1].y;
			} else if (outcodeOut & 2) {  // point is to the right of clip window
				y = y0 + (y1 - y0) * (rectangle[0].x - x0) / (x1 - x0);
				x = rectangle[0].x;
			} else if (outcodeOut & 1) {   // point is to the left of clip window
				y = y0 + (y1 - y0) * (rectangle[1].x - x0) / (x1 - x0);
				x = rectangle[1].x;
			}

			// Now we move outside point to intersection point to clip
			// and get ready for next pass.
			if (outcodeOut == outcode0) {
				p1.x = x;
				p1.y = y;
				outcode0 = getCode(p1);
			} else {
				p2.x = x;
				p2.y = y;
				outcode1 = getCode(p2);
			}
		}
	}
    BresenhamLine(p1.x, p1.y, p2.x, p2.y);
    
    // while(( a | b ) && (!( a & b ))){
    //     if (a == 0){   
    //         help = p1;
    //         p2 = p1;
    //         p2 = help;
    //         help = a;
    //         a = b;
    //         b = help;
    //         help = 0;
    //     }
        
    //     p = p1;
    //     if (a & 1){
    //         p.x = +(p.x + (p2.y - p.y) * (rectangle[0].x - p.x) / (p2.x - p.x)).toFixed(4);
    //         p.y = rectangle[0].x;
    //     }
    //     else if (a & 2){
    //         p.x = +(p.x + (p2.y - p.y) * (rectangle[0].y - p.y) / (p2.x - p.x)).toFixed(4);
    //         p.y = rectangle[0].y;
    //     }
    //     else if (a & 4){
    //         p.y = +(p.y +(p2.y - p.y) * (rectangle[1].x - p.x) / (p2.x - p.x)).toFixed(4);
    //         p.x = rectangle[1].x;
    //     }
    //     else if (a & 8){
    //         p.x = +(p.x + (p2.x - p.x) * (rectangle[1].y  - p.y) / (p2.y - p.y)).toFixed(4);
    //         p.y = rectangle[1].y;
    //     }
    //     a = getCode(p);
    //     b = getCode(p2);
    //     // if (help == a){
    //         // p1 = p;
    //         // a = getCode(p.x, p.y);
    //     // }
    //     // else{
            // p2 = p;
            // b = getCode(p2.x, p2.y);
        // }


        // //
        // if ((help & 1) !=0){
        //     p.y += (p1.y - p2.y) * (rectangle[0].x - p.x) / (p1.x - p2.x);
        //     p.x = rectangle[0].x;
        // }
        // else if ((help & 2)!= 0){
        //     p.y += (p1.y - p2.y) * (rectangle[1].x - rectangle[0].x - p.x) / (p1.x - p2.x);
        //     p.x = rectangle[1].x - rectangle[0].x;
        // }
        // else if ((help & 4)!= 0){
        //     p.x += (p1.x - p2.x) * (rectangle[1].y - rectangle[0].y - p.y) / (p1.y - p2.y);
        //     p.y = rectangle[1].y - rectangle[0].y;
        // }
        // else if ((help & 8)!=0){
        //     p.x += (p1.x - p2.x) * (rectangle[1].y  - p.y) / (p1.y - p2.y);
        //     p.y = rectangle[1].y;
        // }

        // if (help == a){
        //     p1 = p;
        //     a = getCode(p1.x, p1.y);
        // }
        // else{
        //     p2 = p;
        //     b = getCode(p2.x, p2.y);
        // }

    // }
    
}