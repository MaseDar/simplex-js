import React, { useState } from "react";
import SimplexTables from "./SimplexTables";
import SimplexInput from "./SimplexInput";
import ArtificialBasisInput from "./ArtificialBasisInput";

export default function Simplex() {
  const [simplexTable, setSimplexTable] = useState([]);
  const [artificialBasisTable, setArtificialBasisTable] = useState([]);
  return (
    <div>
      <ArtificialBasisInput
        setSimplexTable={setSimplexTable}
        setArtificialBasisTable={setArtificialBasisTable}
      />
      {artificialBasisTable.length !== 0
        ? artificialBasisTable.map((el) => (
            <>
              <br />
              Метод искусственного базиса таблицы
              <SimplexTables simplexTable={el} />
            </>
          ))
        : null}

      {simplexTable.length !== 0
        ? simplexTable.map((el) => (
            <>
              Симплекс таблицы
              <br />
              <SimplexTables simplexTable={el} />
            </>
          ))
        : null}
    </div>
  );
}
