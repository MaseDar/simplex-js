import React from "react";
import "../simplex.css";
export default function SimplexTables(props) {
  let r = [];
  let table = [];
  let restr = [];
  let param = props.simplexTable;
  let simplexTable = param.simplexTable;
  let countVariables = simplexTable.length;
  let countRestrictions = simplexTable[0].length;
  let allParams = param.allParams;
  //   console.log("simtable", param.simplexTable);
  function parseSimplexTable() {
    let count = 0;
    restr.push(
      <th style={{ width: "40px" }}>
        x<sup>({param.step})</sup>
      </th>
    );
    allParams[1].map((el) => restr.push(<th>{el.param}</th>));
    restr.push(<th>b</th>);
    table.push(<tr style={{ textAlign: "center" }}>{restr}</tr>);
    for (let i = 0; i < countRestrictions; i++) {
      for (let j = 0; j < countVariables; j++) {
        if (j === 0) {
          if (i !== countRestrictions - 1)
            r.push(
              <td>
                <b>{allParams[0][count].param}</b>
              </td>
            );
          else
            r.push(
              <td>
                <b>p</b>
              </td>
            );
          count++;
        }
        r.push(<td>{simplexTable[i][j]}</td>);
      }
      table.push(<tr>{[...r]}</tr>);
      // TODO: Фикс блять этой хуйни (повторное нажатие на решение)
      r = [];
    }
    count = 0;
    return <table>{table}</table>;
  }

  return <table>{parseSimplexTable()}</table>;
}
