import React from "react";
import styles from "../../styles/Welcome.module.css";

const Welcome = props => {
  return (
    <div className={styles.welcome}>
      <h1>Choleskey Decomposition</h1>
      <h3>
        Choleskey Decomposition is a decomposition of a Hermitian,
        positive-definite matrix into the product of a lower triangular matrix
        and its conjugate transpose, which is useful for efficient numerical
        solutions
      </h3>
    </div>
  );
};

export default Welcome;
