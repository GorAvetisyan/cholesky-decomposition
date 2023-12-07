import MatrixInput from "./Components/MatrixInput";
import styles from "./../styles/Home.module.css";
import Head from "next/head";
import Welcome from "./Components/Welcome";
import { useEffect, useState } from "react";
import { Matrix, randomMatrix, randomPDSYM } from "../../../Matrix";
import "katex/dist/katex.min.css"; // Import the Katex styles
import { BlockMath } from "react-katex";
import { isNatural } from "../../../helpers";

export default function Home() {
  const [A, setA] = useState(
    new Matrix(3, 3, [
      [6, 15, 55],
      [15, 55, 225],
      [55, 225, 979],
    ]),
  );

  const [B, setB] = useState(new Matrix(3, 1, [[76], [295], [1259]]));
  const [U, setU] = useState(new Matrix(3, 3));
  const [solution, setSolution] = useState(new Matrix(3, 1));
  const [checking, setChecking] = useState(new Matrix(3, 1));
  const [randSize, setRandSize] = useState(10);

  function setRandom() {
    setA(randomPDSYM(randSize));
    setB(randomMatrix(randSize, 1));
    setSolution(new Matrix(randSize, 1));
    setU(new Matrix(randSize, 1));
    setChecking(new Matrix(randSize, 1));
  }

  function solveByCD(matrix, vector) {
    console.log(matrix, vector);
    setU(matrix.findU());
    setSolution(matrix.solveByCD(vector));
    setChecking(A.multiply(matrix.solveByCD(vector)).add(B.scale(-1)));
  }

  function changeRandSize(e) {
    const size = +e.target.value;
    if (isNatural(size)) {
      setRandSize(size);
    }
  }
  const generateColumnVector = n => {
    if (n <= 0) {
      return ""; // Return an empty string for non-positive values of n
    }

    const variables = Array.from({ length: n }, (_, i) => `x${i + 1}`).join(
      " \\\\ ",
    );

    return `\\begin{bmatrix} ${variables} \\end{bmatrix}`;
  };

  const columnVector = generateColumnVector(A.n);

  return (
    <>
      <Head>
        <title>Home App</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat&display=swap"
          rel="stylesheet"
        ></link>
      </Head>
      <Welcome />
      <button onClick={setRandom}>Set Random</button>
      <input type="number" onChange={changeRandSize} value={randSize} />
      <div className={styles.input_matrices}>
        <MatrixInput title={"A"} matrix={A} setMatrix={setA} />
        <MatrixInput title={"B"} matrix={B} setMatrix={setB} />
      </div>
      <h1>System of linear equations</h1>
      <div className={styles.matrix_equation}>
        <BlockMath math={A.getKatex()} />
        <BlockMath math={"\\cdot"} /> {/* KaTeX symbol for multiplication */}
        <BlockMath math={columnVector} />
        <BlockMath math={"="} /> {/* KaTeX symbol for equals */}
        <BlockMath math={B.getKatex()} />
      </div>

      <h1>Idea is to solve 2 less complex systems</h1>
      <div className={styles.steps}>
        <BlockMath>
          {`\\begin{align*}
            Ax &= b \\\\
            (U^T U) x &= b \\\\
            U^T y &= b \\\\
            Ux &= y
          \\end{align*}`}
        </BlockMath>
      </div>

      <h1>Finding U matrix</h1>
      <div className={styles.matrix_equation}>
        <h3>U</h3>
        <BlockMath math={"="} /> {/* KaTeX symbol for equals */}
        <BlockMath math={U.getKatex()} />
      </div>

      <button onClick={e => solveByCD(A, B)}>Solve</button>

      <h1>Solution vector</h1>

      <div className={styles.matrix_equation}>
        <BlockMath math={columnVector} />
        <BlockMath math={"="} /> {/* KaTeX symbol for equals */}
        <BlockMath math={solution.getKatex()} />
      </div>

      <h1>Checking if</h1>

      <div className={styles.steps}>
        <BlockMath>
          {`\\begin{align*}
              Ax - B &\\approx 0 \\\\
            \\end{align*}`}
        </BlockMath>
      </div>

      <div className={styles.matrix_equation}>
        <BlockMath math={checking.getKatex()} />
      </div>
    </>
  );
}
