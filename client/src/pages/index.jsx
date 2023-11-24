import MatrixInput from "./Components/MatrixInput";
import styles from "./../styles/Home.module.css";
import Head from "next/head";
import Welcome from "./Components/Welcome";

export default function Home() {
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


      <Welcome/>

      <div className={styles.input_matrices}>
        <MatrixInput title={"A"} />
        <MatrixInput title={"B"} />
      </div>
    </>
  );
}
