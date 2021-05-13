import Solution from './Gauss';

export default function startSolution(countVariables, func, countRestrictions, restrictions, minMax, basisVariables = [1, 1, 0, 0]){
 
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

    // НАДО ФИКСИТЬ РЕШЕНИЕ В ГАУССЕ, А ТО ОСНОВУ НОРМ СЧИТАЕТ, А ответ (=b) нет!
    Solution(restrictions)
    let last = restrictions[0].length - 1;
    console.log("res", restrictions)
    console.log("res[1][-1]", restrictions[1][last])
    
}