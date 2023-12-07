const { isNatural, isNumber, getRandomArbitrary } = require("./helpers");

class Matrix {
  constructor(n, m, array) {
    let matrix = [];

    if (isNatural(n) && isNatural(m)) {
      this.n = n;
      this.m = m;

      if (typeof array !== "undefined") {
        if (Array.isArray(array) && array.length === n) {
          for (let i = 0; i < n; i++) {
            const row = [];

            if (Array.isArray(array[i]) && array[i].length === m) {
              for (let j = 0; j < m; j++) {
                const elem = array[i][j];

                if (isNumber(elem)) {
                  row.push(elem);
                } else {
                  throw Error(
                    `matrix[${i + 1}][${
                      j + 1
                    }] must be a number got ${typeof elem}`,
                  );
                }
              }
            } else {
              throw Error(`${i + 1}th row must be an array with ${m} elements`);
            }

            matrix.push(row);
          }
        } else {
          throw Error(`input must be an array with ${n} elements`);
        }
      } else {
        matrix = Array(n)
          .fill()
          .map(() => Array(m).fill(0));
      }
    } else {
      throw Error("n and m must be natural numbers");
    }

    this.matrix = matrix;
  }

  isSquare() {
    return this.m == this.n;
  }

  isSymmetric() {
    return this.isEqualTo(this.transpose());
  }

  isEqualTo(B) {
    if (this.n == B.n && this.m == B.m) {
      for (let i = 0; i < this.n; i++) {
        for (let j = 0; j < this.m; j++) {
          if (this.matrix[i][j] !== B.matrix[i][j]) return false;
        }
      }

      return true;
    } else {
      return false;
    }
  }

  transpose() {
    const transposedMatrix = new Matrix(this.m, this.n);

    for (let i = 0; i < this.n; i++) {
      for (let j = 0; j < this.m; j++) {
        // j + 1 and i + 1 see setElem method
        transposedMatrix.setElem(this.matrix[i][j], j + 1, i + 1);
      }
    }

    return transposedMatrix;
  }

  getMinorOfElem(elemRow, elemCol) {
    if (this.validIndexes(elemRow, elemCol)) {
      const minorMatrix = [];

      for (let i = 0; i < this.n; i++) {
        const row = [];

        if (i == elemRow - 1) continue;

        for (let j = 0; j < this.m; j++) {
          if (j == elemCol - 1) continue;

          row.push(this.matrix[i][j]);
        }

        minorMatrix.push(row);
      }

      return new Matrix(this.n - 1, this.m - 1, minorMatrix);
    } else {
      throw Error("Invalid indexes");
    }
  }

  determinant() {
    if (this.isSquare()) {
      if (this.n != 1) {
        let sum = 0;
        if (this.n > 2) {
          for (let i = 0; i < this.n; i++) {
            sum +=
              Math.pow(-1, i) *
              this.matrix[0][i] *
              this.getMinorOfElem(1, i + 1).determinant();
          }
        } else {
          return (
            this.matrix[0][0] * this.matrix[1][1] -
            this.matrix[0][1] * this.matrix[1][0]
          );
        }

        return sum;
      } else {
        return this.matrix[0][0];
      }
    } else {
      throw Error("This works only for square matrices");
    }
  }

  scale(x) {
    if (isNumber(x)) {
      const scaledMatrix = new Matrix(this.n, this.m);
      for (let i = 0; i < this.n; i++) {
        for (let j = 0; j < this.m; j++) {
          scaledMatrix.setElem(x * this.matrix[i][j], i + 1, j + 1);
        }
      }
      return scaledMatrix;
    } else {
      throw Error("Your input is not a number");
    }
  }

  add(B) {
    const resultMatrix = new Matrix(this.n, this.m);
    if (B instanceof Matrix) {
      if (this.m === B.m && this.n === B.n) {
        for (let i = 0; i < this.n; i++) {
          for (let j = 0; j < this.m; j++) {
            resultMatrix.setElem(
              this.matrix[i][j] + B.matrix[i][j],
              i + 1,
              j + 1,
            );
          }
        }
      } else {
        throw Error(`You can not add ${this.type()} and ${B.type()} matrices`);
      }
    } else {
      throw Error("Your input isn't Matrix");
    }
    return resultMatrix;
  }

  subtract(B) {
    return this.add(B.scale(-1));
  }

  type() {
    return `${this.n}x${this.m}`;
  }

  setElem(value, i, j) {
    if (this.validIndexes(i, j)) {
      if (isNumber(value)) {
        if (i <= this.n && j <= this.m) {
          this.matrix[i - 1][j - 1] = value;
        }
      }
    } else {
      throw Error("Invalid indexes");
    }
  }

  multiply(B) {
    if (B instanceof Matrix) {
      if (this.m === B.n) {
        let Result = new Matrix(this.n, B.m);
        let C = new Matrix(B.m, B.n, B.transpose().matrix);
        for (let i = 0; i < this.n; i++) {
          for (let j = 0; j < B.m; j++) {
            let currentElem = 0;
            for (let k = 0; k < this.m; k++) {
              currentElem += this.matrix[i][k] * C.matrix[j][k];
            }
            Result.setElem(currentElem, i + 1, j + 1);
          }
        }
        return Result;
      } else {
        throw Error(
          `You can't multiply ${this.type()} matrix with ${B.type()} matrix `,
        );
      }
    } else {
      throw Error("Your input isn't a matrix");
    }
  }

  validIndexes(i, j) {
    return isNatural(i) && i <= this.n && isNatural(j) && j <= this.m;
  }

  findU() {
    if (this.isSymmetric()) {
      let additions = 0;
      let multiplications = 0;

      const U = new Matrix(this.n, this.m);

      for (let i = 0; i < this.n; i++) {
        let summ = 0;

        for (let k = 0; k < i; k++) {
          summ += U.matrix[k][i] ** 2;
          additions++;
          multiplications++;
        }

        const elem = Math.sqrt(this.matrix[i][i] - summ);
        additions++;

        U.setElem(elem, i + 1, i + 1);

        for (let j = i + 1; j < this.m; j++) {
          let summ = 0;

          for (let k = 0; k < i; k++) {
            summ += U.matrix[k][i] * U.matrix[k][j];
            additions++;
            multiplications++;
          }

          const elem = (this.matrix[i][j] - summ) / U.matrix[i][i];
          additions++;
          multiplications++;

          U.setElem(elem, i + 1, j + 1);
        }
      }

      return U;
    } else {
      throw Error("This works only for symmetric matrices");
    }
  }

  isStrictDiagonalDominant() {
    if (this.isSquare()) {
      for (let i = 0; i < this.n; i++) {
        let summ = 0;

        for (let j = 0; j < this.m; j++) {
          if (i != j) {
            summ += Math.abs(this.matrix[i][j]);
          }
        }

        if (Math.abs(this.matrix[i][i]) <= summ) {
          return false;
        }
      }

      return true;
    } else {
      return false;
    }
  }

  solveUpperTriangular(B) {
    if (this.isUpperTriangular()) {
      if (B instanceof Vector || true) {
        // true because on matrix.multiply(vector) result is instance of Matrix class not Vector !!! must resolve this

        const X = new Vector(this.n);

        // x[n - 1] = b[n - 1] / a[n - 1][n - 1];

        // x[n - 2] = (b[n - 2] - a[n - 1][n] * x[n]) / a[n - 2][n - 2];

        // x[n - 3] = (b[n - 3] - a[n - 2][n] * x[n] - a[n - 2][n - 1] * x[n - 1]) / a[n-3][n-3];

        // x[o] = (b[o] - a[0][n] * x[n] - a[0][n-1] * x[n-1] - ... - a[0][1] * x[1]) / a[0][0]

        const { n } = this;

        for (let i = 1; i <= n; i++) {
          let summ = 0;
          for (let j = 1; j <= i; j++) {
            summ += this.matrix[n - i][n - j] * X.matrix[n - j];
          }

          if (this.matrix[n - i][n - i] != 0) {
            const elem = (B.matrix[n - i] - summ) / this.matrix[n - i][n - i];
            X.setElem(elem, n - i + 1);
          } else {
            throw Error(`Matrix[${n - i + 1}][${n - i + 1}] is Zero`);
          }
        }

        return X;
      } else {
        throw Error(`B must be ${this.n} size Vector`);
      }
    } else {
      throw Error("Matrix is not upper triangular");
    }
  }

  solveLowerTriangular(B) {
    const rM = reversingMatrix(this.n);

    const rowReversedMatrix = rM.multiply(this);
    const colReversedMatrix = rowReversedMatrix.multiply(rM);

    const rowReversedVector = rM.multiply(B);

    const rowReversedSolution =
      colReversedMatrix.solveUpperTriangular(rowReversedVector);

    const solution = rM.multiply(rowReversedSolution);

    return solution;
  }

  isUpperTriangular() {
    if (!this.isSquare()) return false;

    for (let i = 0; i < this.n; i++) {
      for (let j = 0; j < this.n; j++) {
        if (j < i && this.matrix[i][j] !== 0) {
          return false;
        }
      }
    }

    return true;
  }

  // Cholesky decomposition

  solveByCD(B) {
    const U = this.findU();
    const Ut = U.transpose();
    const y = Ut.solveLowerTriangular(B);
    const x = U.solveUpperTriangular(y);
    return x;
  }
  // Describe later))
  setMatrix(matrix, p = 0, q = 0) {
    // TODO validIndexes, setElem  : in this methods we use indexing staring from 1, this bring confusion every time.
    // TODO add validation here

    for (let i = 0; i < Math.min(this.n - p, matrix.n); i++) {
      for (let j = 0; j < Math.min(this.m - q, matrix.m); j++) {
        this.setElem(matrix.matrix[i][j], p + i + 1, q + j + 1);
      }
    }
  }

  getKatex(n) {
    const katex = `\\begin{bmatrix}${this.matrix
      .map(row => row.map(item => (n ? item.toFixed(n) : item)).join(" & "))
      .join(" \\\\ ")}\\end{bmatrix}`;

    return katex;
  }
}

const IdentityMatrix = n => {
  if (isNatural(n)) {
    const I = new Matrix(n, n);
    for (let i = 0; i < n; i++) {
      I.setElem(1, i + 1, i + 1);
    }
    return I;
  } else {
    throw Error("Input must be a Natural number");
  }
};

const reversingMatrix = n => {
  if (isNatural(n)) {
    const result = new Matrix(n, n);

    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        if (i + j == n - 1) {
          result.setElem(1, i + 1, j + 1);
        }
      }
    }

    return result;
  } else {
    throw Error("Input must be a Natural number");
  }
};

class Vector extends Matrix {
  constructor(n, array) {
    const vector = [];

    if (array) {
      array.forEach(item => vector.push([item]));
      super(n, 1, vector);
    } else {
      super(n, 1);
    }
  }

  setElem(value, i) {
    super.setElem(value, i, 1);
  }
}

class Row extends Matrix {
  constructor(m, array) {
    super(1, m, [array]);
  }
}

class PermutationMatrix extends Matrix {
  constructor(n, [a, b]) {
    const I = IdentityMatrix(n);

    const tempRow = [...I.matrix[a - 1]];
    I.matrix[a - 1] = [...I.matrix[b - 1]];
    I.matrix[b - 1] = tempRow;

    super(n, n, I.matrix);
  }
}

const randomMatrix = (n, m) => {
  const A = new Matrix(n, m);
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      A.matrix[i][j] = Math.round(getRandomArbitrary(-8, 8));
    }
  }
  return A;
};

// Random Positive Definite and Symmetric Matrix
const randomPDSYM = n => {
  const X = randomMatrix(n, n);
  return X.transpose().multiply(X);
};

module.exports = {
  Matrix,
  Vector,
  Row,
  PermutationMatrix,
  randomPDSYM,
  randomMatrix,
};
