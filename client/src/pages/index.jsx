import MatrixInput from "./Components/MatrixInput";
import styles from "./../styles/Home.module.css";
import Head from "next/head";
import Welcome from "./Components/Welcome";
import { useEffect, useState } from "react";
import { Matrix } from "../../../Matrix";
import "katex/dist/katex.min.css"; // Import the Katex styles
import { BlockMath } from "react-katex";

export default function Home() {
  const [A, setA] = useState(
    new Matrix(3, 3, [
      [6, 15, 55],
      [15, 55, 225],
      [55, 225, 979],
    ]),
  );

  const [B, setB] = useState(new Matrix(3, 1, [[76], [295], [1259]]));
  const [solution, setSolution] = useState(new Matrix(3, 1));

  function solveByCD(matrix, vector) {
    setSolution(matrix.solveByCD(vector));
  }

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
      <div className={styles.input_matrices}>
        <MatrixInput title={"A"} matrix={A} setMatrix={setA} />
        <MatrixInput title={"B"} matrix={B} setMatrix={setB} />
      </div>
      <div className={styles.matrix_equation}>
        <BlockMath math={A.getKatex()} />
        <BlockMath math={"\\cdot"} /> {/* KaTeX symbol for multiplication */}
        <BlockMath
          math={"\\begin{bmatrix} x1 \\\\ x2 \\\\ x3 \\end{bmatrix}"}
        />
        <BlockMath math={"="} /> {/* KaTeX symbol for equals */}
        <BlockMath math={B.getKatex()} />
      </div>
      <div className={styles.matrix_equation}>
        <BlockMath
          math={"\\begin{bmatrix} x1 \\\\ x2 \\\\ x3 \\end{bmatrix}"}
        />
        <BlockMath math={"="} /> {/* KaTeX symbol for equals */}
        <BlockMath math={solution.getKatex()} />
      </div>
      <button onClick={e => solveByCD(A, B)}>Solve</button>
    </>
  );
}
