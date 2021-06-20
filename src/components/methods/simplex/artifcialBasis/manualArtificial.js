import { setF, setSimplex } from "../simplexAlgorithm";
let func;
let countVariables;
export default function FirstTable(
  _countVariables,
  _func,
  countRestrictions,
  restrictions,
  minMax,
  added,
  artStep = 0,
  simpStep = 0,
  artHistory = [],
  simpHistory = [],
  pivotRow = -1,
  pivotCol = -1,
  pivotValue = 0.000001
) {
  func = _func;
  countVariables = _countVariables;
  let artNsimplex = [];
  let allParams = [[], []];
  console.log("added", added);
  // делаем таблицу искусственного базиса
  let inputTable = [];
  let lastRowTable = [];
  restrictions.map((e) => inputTable.push([...e]));
  // вычисляем последнюю строку для таблицы
  for (let i = 0; i < countVariables + 1; i++) {
    let columnSum = 0;
    for (let j = 0; j < countRestrictions; j++) {
      columnSum -= inputTable[j][i];
    }
    lastRowTable.push(columnSum);
  }
  inputTable.push(lastRowTable);

  let helpAdded = 0,
    helpOther = 0;
  for (let i = 0; i < added.length; i++) {
    let help = i + 1;
    if (!!added[i] || i > countVariables) {
      allParams[0][helpAdded] = {
        param: "x" + help,
        num: i,
        column: 0,
        row: helpAdded,
      };
      helpAdded++;
    } else {
      allParams[1][helpOther] = {
        param: "x" + help,
        num: i,
        column: helpOther,
        row: 0,
      };
      helpOther++;
    }
  }
  console.log("lastrowTable", { inputTable, allParams });
  let table = {};
  let artivicialHistory = artHistory;
  let simplexHistory = simpHistory;
  let simplexTable = {};
  if (artStep === 0) {
    table = setArtificialBasis(
      inputTable,
      allParams,
      artStep,
      pivotRow,
      pivotCol,
      pivotValue
    );
    artivicialHistory.push(table);
    artNsimplex[0] = artivicialHistory;
  } else if (artStep === inputTable.length - 1) {
    if (simpStep === 0) {
      let needSum = setAfterArtificial(
        artivicialHistory[artivicialHistory.length - 1].artificialTable,
        allParams
      );
      let mylittlepony = setF(needSum);
      console.log("mylittlepony", mylittlepony);
      artivicialHistory[artivicialHistory.length - 1].artificialTable.pop();
      let goSimplexTable =
        artivicialHistory[artivicialHistory.length - 1].artificialTable;
      goSimplexTable.push(mylittlepony);
      simplexTable = oneSimplex(
        goSimplexTable,
        allParams,
        simpStep,
        pivotRow,
        pivotCol,
        pivotValue
      );
      simplexHistory.push(simplexTable);
      artNsimplex[1] = simplexHistory;
    } else {
      simplexTable = oneSimplex(
        inputTable,
        allParams,
        simpStep,
        pivotRow,
        pivotCol,
        pivotValue
      );
      simplexHistory.push(simplexTable);
      artNsimplex[1] = simplexHistory;
    }
  } else {
    table = setArtificialBasis(
      inputTable,
      allParams,
      artStep,
      pivotRow,
      pivotCol,
      pivotValue
    );
    artivicialHistory.push(table);
    artNsimplex[0] = artivicialHistory;
  }

  // artNsimplex.push(tables);
  // artNsimplex.push(simplexTable);
  return artNsimplex;
}

export function otherSteps(
  inputTable,
  pivot,
  params,
  artHistory = [],
  simpHistory = [],
  artStep,
  simpStep
) {
  let { pivotRow, pivotCol, pivotValue } = pivot;

  let allParams = params.allParams;
  let artNsimplex = [];
  let simplexTable = {};

  let table = {};
  let artivicialHistory = artHistory;
  let simplexHistory = simpHistory;
  if (artStep === 0) {
    table = setArtificialBasis(
      inputTable,
      allParams,
      artStep,
      pivotRow,
      pivotCol,
      pivotValue
    );
    artivicialHistory.push(table);
    artNsimplex[0] = artivicialHistory;
  } else if (artStep === inputTable.length - 1) {
    if (simpStep === 0) {
      table = setArtificialBasis(
        inputTable,
        allParams,
        artStep,
        pivotRow,
        pivotCol,
        pivotValue
      );
      artivicialHistory.push(table);
      artNsimplex[0] = artivicialHistory;
      let needSum = setAfterArtificial(
        JSON.parse(
          JSON.stringify(
            artivicialHistory[artivicialHistory.length - 1].artificialTable
          )
        ),
        allParams
      );
      let mylittlepony = setF(needSum);
      console.log("mylittlepony", mylittlepony);
      let goSimplexTable = JSON.parse(
        JSON.stringify(
          artivicialHistory[artivicialHistory.length - 1].artificialTable
        )
      );
      goSimplexTable.pop();
      goSimplexTable.push(mylittlepony);
      simplexTable = oneSimplex(
        goSimplexTable,
        allParams,
        simpStep,
        -1,
        -1,
        0.000001
      );
      simplexHistory.push(simplexTable);
      artNsimplex[1] = simplexHistory;
    } else {
      simplexTable = oneSimplex(
        inputTable,
        allParams,
        simpStep,
        pivotRow,
        pivotCol,
        pivotValue
      );
      simplexHistory.push(simplexTable);
      artNsimplex[0] = artivicialHistory;
      artNsimplex[1] = simplexHistory;
    }
  } else {
    table = setArtificialBasis(
      inputTable,
      allParams,
      artStep,
      pivotRow,
      pivotCol,
      pivotValue
    );
    artivicialHistory.push(table);
    artNsimplex[0] = artivicialHistory;
  }

  // artNsimplex.push(tables);
  // artNsimplex.push(simplexTable);
  return artNsimplex;
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
function setArtificialBasis(
  artificialTable,
  allParams,
  step,
  pivotRow,
  pivotCol,
  pivotValue
) {
  let column = artificialTable[0].length;
  let lastCol = artificialTable[0].length - 1;
  let row = artificialTable.length;
  let lastRow = artificialTable.length - 1;
  let notMin = 9999;
  let pivot = pivotValue;
  let helperParam, helperNum;
  let coeff = [];
  let allTables = [];
  let tableObj = {};

  let rowMin = pivotRow,
    colMin = pivotCol;
  let min = +(1 / pivotValue).toFixed(2);

  // TODO: Если весь столбец <0, то функция неограничена снизу
  //   for (let step = 0; ; step++) {

  column = artificialTable[0].length;
  lastCol = artificialTable[0].length - 1;
  row = artificialTable.length;
  lastRow = artificialTable.length - 1;
  // TODO: ДЕЛАТЬ КОПИИ МАССИВОВ ИЛИ НЕТ!??! ВОТ В ЧЕМ ВОПРОС
  // Ищем минимальное неотриц из всех
  // Условие выхода из искусственного базиса

  let maybe = [];

  // Если выбрали ручной метод в первый раз, то формируем таблицу и выводим её
  if (step === 0) {
    for (let k = 0; k < lastCol; k++) {
      if (artificialTable[lastRow][k] < 0) {
        for (let i = 0; i < lastRow; i++) {
          // TODO: Посмотреть что там с 0 в значениях и функциях
          if (artificialTable[i][k] <= 0) continue;
          notMin = +(1 / artificialTable[i][k]).toFixed(2);
          maybe.push({
            row: i,
            column: k,
            value: artificialTable[i][k],
            min: notMin,
          });
          if (min > notMin) {
            rowMin = i;
            colMin = k;
            min = notMin;
            pivot = artificialTable[i][k];
          }
        }
      }
    }
    tableObj = {
      artificialTable: JSON.parse(JSON.stringify(artificialTable)),
      step,
      f: -artificialTable[lastRow][lastCol],
      allParams: JSON.parse(JSON.stringify(allParams)),
      pivot: { rowMin, colMin },
      maybe,
    };
    return tableObj;
  }

  // Записываем коэфициенты для искусственного базиса
  for (let i = 0; i < row; i++) {
    coeff[i] = artificialTable[i][colMin];
  }
  // console.log("min", { artificialTable, rowMin, colMin, min, pivot });
  artificialTable[rowMin][colMin] = min;
  // Меняем столбец
  for (let i = 0; i < row; i++) {
    if (i === rowMin) continue;
    artificialTable[i][colMin] = +(-artificialTable[i][colMin] / pivot).toFixed(
      2
    );
  }
  // Меняем строчку
  for (let i = 0; i < column; i++) {
    if (i === colMin) continue;
    artificialTable[rowMin][i] = +(artificialTable[rowMin][i] / pivot).toFixed(
      2
    );
  }

  // Меняем переменные (для отрисовки потом)
  // basises[]
  helperParam = allParams[0][rowMin].param;
  helperNum = allParams[0][rowMin].num;

  allParams[0][rowMin].param = allParams[1][colMin].param;
  allParams[0][rowMin].num = allParams[1][colMin].num;

  allParams[1][colMin].param = helperParam;
  allParams[1][colMin].num = helperNum;
  helperParam = -1;
  helperNum = -1;

  // console.log("Поменял столбец и строчку", {
  //   artificialTable,
  //   rowMin,
  //   colMin,
  //   min,
  //   pivot,
  // });
  // console.log(allParams);

  // Вычисляем строчки (но идем по столбцам, т.к. js плох в массивы или я туплю)
  for (let i = 0; i < row; i++) {
    if (i === rowMin) continue;
    for (let j = 0; j < column; j++) {
      if (j === colMin) continue;
      artificialTable[i][j] = +(
        artificialTable[i][j] -
        coeff[i] * artificialTable[rowMin][j]
      ).toFixed(2);
    }
  }
  // console.log("before splice:", { artificialTable });

  // Удаляем опорный столбец
  for (let i = 0; i < row; i++) {
    artificialTable[i].splice(colMin, 1);
  }
  allParams[1].splice(colMin, 1);

  column = artificialTable[0].length;
  lastCol = artificialTable[0].length - 1;
  row = artificialTable.length;
  lastRow = artificialTable.length - 1;

  console.log("after splice:", { artificialTable });
  min = 9999;
  maybe = [];
  // Поиск опорных точек
  for (let k = 0; k < lastCol; k++) {
    if (artificialTable[lastRow][k] < 0) {
      for (let i = 0; i < lastRow; i++) {
        // TODO: Посмотреть что там с 0 в значениях и функциях
        if (artificialTable[i][k] <= 0) continue;
        notMin = +(1 / artificialTable[i][k]).toFixed(2);
        maybe.push({
          row: i,
          column: k,
          value: artificialTable[i][k],
          min: notMin,
        });
        if (min > notMin) {
          rowMin = i;
          colMin = k;
          min = notMin;
          pivot = artificialTable[i][k];
        }
      }
    }
  }
  tableObj = {
    artificialTable: JSON.parse(JSON.stringify(artificialTable)),
    step,
    f: -artificialTable[lastRow][lastCol],
    allParams: JSON.parse(JSON.stringify(allParams)),
    pivot: { rowMin, colMin },
    maybe,
  };
  if (step === row - 1) {
    console.log("Конец искусственного базиса:", { allTables });
    return tableObj;
  }
  return tableObj;
}

function setAfterArtificial(table, allParams) {
  let newCount = 0;
  let beforeCount = 0;
  let last = table[0].length - 1;
  let arrTable = [];
  for (let i = 0; i < countVariables; i++) {
    arrTable[i] = [];
  }
  let basis = [];
  let notBasis = [];
  allParams[0].map((e) => basis.push(e.num));
  allParams[1].map((e) => notBasis.push(e.num));
  let boolean = false;
  let boolean2 = false;
  let num = -1;
  // формируем коэфициенты f(x)
  for (let i = 0; i < countVariables; i++) {
    if (basis[i] !== undefined) {
      num = basis[i];
      for (let j = 0; j <= last; j++)
        arrTable[beforeCount][j] = table[beforeCount][j] * -func[num]; // -func[i], потому что мы выражаем 1 переменную через другие, и при переносе знак меняется
      arrTable[beforeCount][last] = table[beforeCount][last] * func[num]; // т.к. в выше мы все умножили на -1, но константа остается за =, поэтому её не умножаем на -1
      beforeCount++;
    } // Записываем свободные переменные в массив, чтобы потом их суммировать и получить mylittlepony[]
    else if (notBasis[newCount] !== undefined) {
      num = notBasis[newCount];
      for (let j = 0; j <= last; j++) {
        arrTable[beforeCount][j] = 0;
      }
      arrTable[beforeCount][newCount] = func[num];
      newCount++;
      beforeCount++;
    } else {
      for (let j = 0; j <= last; j++) {
        arrTable[i][j] = 0;
      }
    }
    boolean = false;
    boolean2 = false;
    num = -1;
  }
  return arrTable;
}

function oneSimplex(
  simplexTable,
  allParams,
  step,
  pivotRow,
  pivotCol,
  pivotValue
) {
  let column = simplexTable[0].length;
  let lastCol = simplexTable[0].length - 1;
  let row = simplexTable.length;
  let lastRow = simplexTable.length - 1;

  let notMin = 9999;
  let rowMin = pivotRow,
    colMin = pivotCol;
  let min = +(1 / pivotValue).toFixed(2);
  let pivot = pivotValue;
  let helperParam, helperNum;
  let coeff = [];
  let allTables = [];
  let table = {};

  // костыль для выхода из цикла
  // if (min === 9999) {
  //   return table;
  // }

  // TODO: Если весь столбец <0, то функция неограничена снизу
  // for (let step = 0; ; step++) {
  // TODO: ДЕЛАТЬ КОПИИ МАССИВОВ ИЛИ НЕТ!??! ВОТ В ЧЕМ ВОПРОС
  // Ищем минимальное неотриц из всех
  let maybe = [];

  // Если выбрали ручной метод в первый раз, то формируем таблицу и выводим её
  if (step === 0) {
    for (let k = 0; k < lastCol; k++) {
      if (simplexTable[lastRow][k] < 0) {
        for (let i = 0; i < lastRow; i++) {
          // TODO: Посмотреть что там с 0 в значениях и функциях
          if (simplexTable[i][k] <= 0) continue;
          notMin = +(1 / simplexTable[i][k]).toFixed(2);
          maybe.push({
            row: i,
            column: k,
            value: simplexTable[i][k],
            min: notMin,
          });
          if (min > notMin) {
            rowMin = i;
            colMin = k;
            min = notMin;
            pivot = simplexTable[i][k];
          }
        }
      }
    }
    table = {
      simplexTable: JSON.parse(JSON.stringify(simplexTable)),
      step,
      f: -simplexTable[lastRow][lastCol],
      allParams: JSON.parse(JSON.stringify(allParams)),
      pivot: { rowMin, colMin },
    };
    return table;
  }

  for (let i = 0; i < row; i++) {
    coeff[i] = simplexTable[i][colMin];
  }
  // console.log("min", { simplexTable, rowMin, colMin, min, pivot });
  simplexTable[rowMin][colMin] = min;
  // Меняем столбец
  for (let i = 0; i < row; i++) {
    if (i === rowMin) continue;
    simplexTable[i][colMin] = +(-simplexTable[i][colMin] / pivot).toFixed(2);
  }
  // Меняем строчку
  for (let i = 0; i < column; i++) {
    if (i === colMin) continue;
    simplexTable[rowMin][i] = +(simplexTable[rowMin][i] / pivot).toFixed(2);
  }

  // Меняем переменные (для отрисовки потом)
  // basises[]
  helperParam = allParams[0][rowMin].param;
  helperNum = allParams[0][rowMin].num;

  allParams[0][rowMin].param = allParams[1][colMin].param;
  allParams[0][rowMin].num = allParams[1][colMin].num;

  allParams[1][colMin].param = helperParam;
  allParams[1][colMin].num = helperNum;
  helperParam = -1;
  helperNum = -1;

  // console.log("Поменял столбец и строчку", {
  //   simplexTable,
  //   rowMin,
  //   colMin,
  //   min,
  //   pivot,
  // });
  // console.log(allParams);

  // Вычисляем строчки (но идем по столбцам, т.к. js плох в массивы или я туплю)
  for (let i = 0; i < row; i++) {
    if (i === rowMin) continue;
    for (let j = 0; j < column; j++) {
      if (j === colMin) continue;
      simplexTable[i][j] = +(
        simplexTable[i][j] -
        coeff[i] * simplexTable[rowMin][j]
      ).toFixed(2);
    }
  }
  maybe = [];

  // Если выбрали ручной метод в первый раз, то формируем таблицу и выводим её

  for (let k = 0; k < lastCol; k++) {
    if (simplexTable[lastRow][k] < 0) {
      for (let i = 0; i < lastRow; i++) {
        // TODO: Посмотреть что там с 0 в значениях и функциях
        if (simplexTable[i][k] <= 0) continue;
        notMin = +(1 / simplexTable[i][k]).toFixed(2);
        maybe.push({
          row: i,
          column: k,
          value: simplexTable[i][k],
          min: notMin,
        });
        if (min > notMin) {
          rowMin = i;
          colMin = k;
          min = notMin;
          pivot = simplexTable[i][k];
        }
      }
    }
  }
  table = {
    simplexTable: JSON.parse(JSON.stringify(simplexTable)),
    step,
    f: -simplexTable[lastRow][lastCol],
    allParams: JSON.parse(JSON.stringify(allParams)),
    pivot: { rowMin, colMin },
  };
  return table;
}
// }
