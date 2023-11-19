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
      throw Error('This works only for square matrices');
    }

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
          `You can't multiply ${this.type()} matrix with ${B.type()} matrix `
        );
      }
    } else {
      throw Error("Your input isn't a matrix");
    }
  }
}

class Vector extends Matrix{
  constructor(n, array) {
    const vector = [];
    array.forEach(item => vector.push([item]));
    super(n, 1, vector);
    
  }
}

class Row extends Matrix{
  constructor(m, array) {
    
    super(1, m, [array]);
    
  }
}

module.exports = {Matrix, Vector, Row};