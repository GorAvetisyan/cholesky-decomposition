import React, { useEffect, useState } from "react";
import { Matrix } from "../../../../Matrix.js";
import { isNatural } from "../../../../helpers.js";
import styles from "../../styles/MatrixInput.module.css";

const MatrixInput = ({ title }) => {
  const [size, setSize] = useState({
    n: 3,
    m: 3,
  });

  const [matrix, setMatrix] = useState(new Matrix(3, 3));
  const [focusedCell, setFocusedCell] = useState({
    i: null,
    j: null,
    value: 0,
  });

  useEffect(() => {
    const newMatrix = new Matrix(size.n, size.m);
    newMatrix.setMatrix(matrix);
    setMatrix(newMatrix);
  }, [size]);

  const handleSizeChange = e => {
    if (isNatural(+e.target.value)) {
      setSize({
        ...size,
        [e.target.name]: +e.target.value,
      });
    }
  };

  const setMatrixElement = () => {
    const { value, i, j } = focusedCell;
    matrix.setElem(+value || 0, i + 1, j + 1);
    setMatrix(new Matrix(size.n, size.m, matrix.matrix));
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
            value={size.n}
          />
        </div>
        <div>
          <label>M</label>
          <input
            type="number"
            name="m"
            onChange={handleSizeChange}
            value={size.m}
          />
        </div>
      </div>
      <div className={styles.matrix}>
        {matrix.matrix.map((row, i) => {
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
