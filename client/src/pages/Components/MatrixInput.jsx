import React, { useEffect, useState } from "react";
import { Matrix } from "../../../../Matrix.js";
import { isNatural } from "../../../../helpers.js";
import styles from "../../styles/MatrixInput.module.css";

const MatrixInput = ({ title, matrix, setMatrix }) => {
  const [focusedCell, setFocusedCell] = useState({
    i: null,
    j: null,
    value: 0,
  });

  const handleSizeChange = e => {
    if (isNatural(+e.target.value)) {
      const n = e.target.name === "n" ? +e.target.value : matrix?.n;
      const m = e.target.name === "m" ? +e.target.value : matrix?.m;
      const newMatrix = new Matrix(n, m);
      newMatrix.setMatrix(matrix);
      setMatrix(newMatrix);
    }
  };

  const setMatrixElement = () => {
    const { value, i, j } = focusedCell;
    matrix?.setElem(+value || 0, i + 1, j + 1);
    setMatrix(new Matrix(matrix?.n, matrix?.m, matrix?.matrix));
  };

  const handleCellChange = (value, i, j) => {
    console.log(value, i, j);
    setFocusedCell({ value, i, j });
  };

  return (
    <div className={styles.matrix_input}>
      <h3>{title} matrix Input</h3>
      <div className={styles.size_inputs}>
        <div>
          <label>N</label>
          <input
            type="number"
            name="n"
            onChange={handleSizeChange}
            value={matrix?.n}
          />
        </div>
        <div>
          <label>M</label>
          <input
            type="number"
            name="m"
            onChange={handleSizeChange}
            value={matrix?.m}
          />
        </div>
      </div>
      <div className={styles.matrix}>
        {matrix?.matrix?.map((row, i) => {
          return (
            <div key={i} className={styles.row}>
              {row.map((item, j) => {
                return (
                  <div key={j} className={styles.cell}>
                    <input
                      type="number"
                      value={
                        focusedCell.i === i && focusedCell.j === j
                          ? focusedCell.value
                          : item
                      }
                      onChange={e => handleCellChange(e.target.value, i, j)}
                      onBlur={e => setMatrixElement(i, j)}
                    />
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MatrixInput;
