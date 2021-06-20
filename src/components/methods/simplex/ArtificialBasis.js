import React, { useState } from "react";
import SimplexTables from "./SimplexTables";
import SimplexInput from "./SimplexInput";
import ManualTables from "./ManualTables/ManualArtificial";
import ArtificialBasisInput from "./ArtificialBasisInput";

export default function Simplex() {
  const [simplexTable, setSimplexTable] = useState([]);
  const [artificialBasisTable, setArtificialBasisTable] = useState([]);
  const [anotherTable, setAnotherTable] = useState([]);
  return (
    <div>
      <ArtificialBasisInput
        setSimplexTable={setSimplexTable}
        setArtificialBasisTable={setArtificialBasisTable}
        setAnotherTable={setAnotherTable}
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
      {anotherTable.length !== 0 ? (
        <ManualTables
          simplexTable={anotherTable[1]}
          artificialBasisTable={anotherTable[0]}
          setSimplexTable={setSimplexTable}
          setArtificialBasisTable={setArtificialBasisTable}
          setAnotherTable={setAnotherTable}
        />
      ) : null}
    </div>
  );
}
