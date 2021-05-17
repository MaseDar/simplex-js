import GaussSolution from './Gauss';

export default function startSolution(countVariables, func, countRestrictions, restrictions, minMax, basises){
 
    /*  Пример, чтобы понять что делать дальше
    * [-1]x1+[-2]x2+[-3]x3+[-4]x4+[-5]x5 -> min/max 
    * Строим таблицу и используем метод гаусса для базисных переменных 
    *  x1 x2 x3 x4 x5  b                                                                          беру значение у r[x1] = x4 
    * [1, 0, 0, 2, 3] [8]     выраженные значения пусть будут r[x]                x4  x5  c       (f(x1))* [r[x1]] + ...    
    * [0, 1, 0, 4, 5] [9] =>  x1 = 8-2x4-3x5, x2 = 9-4x4-5x5, x3 = 10-6x4-8x5 => [[], [], []] => [ [(-1) * [-2]  + (-2)*[-4]+(-3)*[-6]+(-4) ], [], []] = mylittlepony[] => получается симплекс таблица вида:
    * [0, 0, 1, 6, 7] [10]
    * 
    *  x4 x5  b  <- arr после гаусса (который выше)
    * [*, *] [*] <- r[x]
    * [*, *] [*] <- r[x]
    * ----------
    * [*, *] [c] <- mylittlepony[]
    */

    // Пока решаем для минимума, т.к. позже можно будет перевести из максимума путем смены знаков.

    let arrBasis = [];
    let arrOther = [];    
    let count = 0;
    basises.map(e => e ? count++ : 0)
    let arrBeforeSimplex = [];
    // Создаем массивы для того, чтобы сделать правильную матрицу БАЗИСНЫЕ|ОСТАЛЬНЫЕ|B
    for (let i = 0; i < countRestrictions; i++){
        arrBasis[i] = [] // new Array(count-1);
        arrOther[i] = [] //new Array(countVariables-count-1)
    }
    for (let i = 0; i < countVariables; i++) 
        arrBeforeSimplex[i] = []
    
        // Отделяем базисные и другие
    for (let i = 0; i < restrictions[0].length-1; i++){
        for(let j = 0; j < restrictions.length; j++){
            if (basises[i])
                arrBasis[j].push(restrictions[j][i]);
            else 
                arrOther[j].push(restrictions[j][i]);
        }
    }
 
    console.log("arrBasis", arrBasis);
    console.log("arrOther", arrOther);
    
    // Записываем все после отделения в 1 массив, чтобы дальше работать с ним.
    for (let i = 0; i < restrictions.length; i++)
        for(let j = 0; j < arrOther[0].length; j++)
            arrBasis[i].push(arrOther[i][j]);
    
    // Добавляем B (решение, которое после = )
    for (let i = 0; i < restrictions.length; i++)
        arrBasis[i].push(restrictions[i][countVariables]);
   
    console.log("Score", arrBasis);
    // Проводим метод гаусса, чтобы выразить базисные переменные
    let afterGauss = GaussSolution(JSON.parse(JSON.stringify(arrBasis)));
    // Выражаем переменные
    let beforeSimplex = [];
    for (let i = 0; i < countRestrictions; i++)
        beforeSimplex[i] = afterGauss[i].slice(count);
    
    console.log("aftergauss:", afterGauss)
    console.log("beforeSimplex:", beforeSimplex)
    console.log("func", func);

    let newCount = 0;
    let beforeCount = 0;
    let last = beforeSimplex[0].length-1 
    // формируем коэфициенты f(x)
    for (let i = 0; i < countVariables; i++) {
                    
        if (basises[i]){
            for (let j = 0; j <= last; j++)                         
                arrBeforeSimplex[i][j] = beforeSimplex[beforeCount][j] * (-func[i]) // -func[i], потому что мы выражаем 1 переменную через другие, и при переносе знак меняется
            arrBeforeSimplex[i][last] = beforeSimplex[beforeCount][last] * func[i] // т.к. в выше мы все умножили на -1, но константа остается за =, поэтому её не умножаем на -1
            beforeCount++;
        } // Записываем свободные переменные в массив, чтобы потом их суммировать и получить mylittlepony[]
        else if (newCount !== countVariables-count){ 
                for (let j = 0; j <= last; j++) 
                    arrBeforeSimplex[i][j] = 0; 
                    arrBeforeSimplex[i][newCount] = func[i]
                newCount++
            }               
    }
    // Создаем массив итоговой функции f(x) и заполняем 0
    let mylittlepony = [] 
    for (let i = 0; i < arrBeforeSimplex[0].length; i++)
            mylittlepony[i] = 0;        
    // Вычисляем функцию f(x). Например было f(x) = 4x1+2x2+3х3+4х4, где х1 и х2 - базисы
    // Мы вычислели f(x), выраженную через базисные переменные x1 и x2. (Пояснение в самом верху, где r(x) - arrBeforeSimplex )
    for (let i = 0; i < arrBeforeSimplex[0].length; i++) 
        for (let j = 0; j < arrBeforeSimplex.length; j++) 
            mylittlepony[i] += arrBeforeSimplex[j][i];
     
    console.log("MY LITTLE PONY!!!!!!", mylittlepony);
    console.log("arrBeforeSimplex", arrBeforeSimplex);
    beforeSimplex.push(mylittlepony)
    console.log("MY LITTLE SIMPLEX TABLE!!!", beforeSimplex);    
   // SIMPLEX METHOD
   
    
}