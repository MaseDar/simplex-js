import React, { useState } from "react";
import SimplexInput from "./SimplexInput";
import SimplexTables from "./SimplexTables";

export default function Simplex() {
  const [simplexTable, setSimplexTable] = useState([]);
  return (
    <div>
      <SimplexInput setSimplexTable={setSimplexTable} />
      {simplexTable.length !== 0
        ? simplexTable.map((el) => (
            <>
              <br />
              <SimplexTables simplexTable={el} />
            </>
          ))
        : null}
    </div>
  );
}
