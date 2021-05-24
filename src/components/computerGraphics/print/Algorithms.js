
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
        y  = y0,
        out= []
 
    setPixel(x0, y0);
 
    for (var i = 0; i < s; i++) {
        x += xi;
        y += yi;
        setPixel(x, y);
    }
}

function ellipse(xm, ym, a, b)
{
   var x = -a, y = 0;           /* II. quadrant from bottom left to top right */
   var e2, dx = (1+2*x)*b*b;                              /* error increment  */
   var dy = x*x, err = dx+dy;                              /* error of 1.step */

   do {
       setPixel(xm-x, ym+y);                                 /*   I. Quadrant */
       setPixel(xm+x, ym+y);                                 /*  II. Quadrant */
       setPixel(xm+x, ym-y);                                 /* III. Quadrant */
       setPixel(xm-x, ym-y);                                 /*  IV. Quadrant */
       e2 = 2*err;                                        
       if (e2 >= dx) { x++; err += dx += 2*b*b; }                   /* x step */
       if (e2 <= dy) { y++; err += dy += 2*a*a; }                   /* y step */
   } while (x <= 0);

   while (y++ < b) {            /* too early stop for flat ellipses with a=1, */
       setPixel(xm, ym+y);                        /* -> finish tip of ellipse */
       setPixel(xm, ym-y);
   }
}