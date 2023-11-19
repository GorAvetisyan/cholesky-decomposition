const { isNatural } = require('./helpers');

class Matrix {
  constructor(n, m, array) {

    let matrix = [];

    if (isNatural(n) && isNatural(m)) {
    
      this.n = n;
      this.m = m;

      if (typeof array !== 'undefined') {
        if (Array.isArray(array) && array.length === n) {
          for (let i = 0; i < n; i++) {
            
            const row = [];

            if (Array.isArray(array[i]) && array[i].length === m) {
              for (let j = 0; j < m; j++) {

                const elem = array[i][j];
                
                if (typeof elem === 'number' && !isNaN(elem)) {
                  
                  row.push(elem);

                } else {
                  throw Error(`matrix[${i + 1}][${j + 1}] must be a number got ${typeof elem}`);
                }
              }
              
            } else {
              throw Error(`${i+1}th row must be an array with ${m} elements`);
            
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
      throw Error('n and m must be natural numbers')
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
    const transposedMatrix = Array(this.m)
      .fill()
      .map(() => Array(this.n).fill());

    for (let i = 0; i < this.n; i++) {
      for (let j = 0; j < this.m; j++) {
        transposedMatrix[j][i] = this.matrix[i][j];
      }
    }

    return new Matrix(transposedMatrix);
  }

  getMinorOfElem(elemRow, elemCol) {
    const n = this.n;
    const minorMatrix = [];

    for (let i = 0; i < n; i++) {
      const row = [];

      if (i == elemRow) continue;

      for (let j = 0; j < n; j++) {
        if (j == elemCol) continue;

        row.push(this.matrix[i][j]);
      }

      minorMatrix.push(row);
    }

    return new Matrix(minorMatrix);
  }

  determinant() {
    const n = this.matrix.length;
    let sum = 0;
    if (n > 2) {
      for (let i = 0; i < n; i++) {
        sum +=
          Math.pow(-1, i) *
          this.matrix[0][i] *
          this.getMinorOfElem(0, i).determinant();
      }
    } else {
      return (
        this.matrix[0][0] * this.matrix[1][1] -
        this.matrix[0][1] * this.matrix[1][0]
      );
    }

    return sum;
  }

  scale(x) {
    let scaledMatrix = [];
    for (let i = 0; i < this.n; i++) {
      let row = [];
      for (let j = 0; j < this.m; j++) {
        row.push(x * this.matrix[i][j]);
      }
      scaledMatrix.push(row);
    }
    return new Matrix(scaledMatrix);
  }

  add(B) {
    let result = [];
    if (B instanceof Matrix) {
      if (this.m === B.m && this.n === B.n) {
        for (let i = 0; i < this.n; i++) {
          let row = [];
          for (let j = 0; j < this.m; j++) {
            row.push(this.matrix[i][j] + B.matrix[i][j]);
          }
          result.push(row);
        }
      } else {
        throw Error(`You can not add ${this.type()} and ${B.type()} matrices`);
      }
    } else {
      throw Error("Your input isn't Matrix");
    }
    return new Matrix(result);
  }

  subtract(B) {
    return this.add(B.scale(-1));
  }

  type() {
    return `${this.n}x${this.m}`;
  }

  setElem(value, i, j) {
    if (typeof value === "number" && !isNaN(value)) {
      if (i <= this.n && j <= this.m) {
        this.matrix[i - 1][j - 1] = value;
      }
    }
  }
}

module.exports = Matrix;