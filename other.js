const {Matrix, Vector, Row} = require('./Matrix');

// const matrix1 = new Matrix([
//   [0, 0, 2],
//   [5, 9, 9],
//   [9, 9, 6],
// ]);

// const matrix2 = new Matrix([
//   [5, 7, 7],
//   [1, 3, 2],
//   [3, 0, 8],
// ]);

// const matrix3 = new Matrix([
//   [5, 8, 4, 6],
//   [2, 7, 7, 7],
//   [8, 4, 2, 3],
//   [4, 6, 0, 8],
// ]);

// const matrix4 = new Matrix([
//   [3, 7, 7, 1],
//   [3, 3, 8, 5],
//   [9, 7, 6, 1],
//   [5, 4, 5, 3],
// ]);

// const matrix5 = new Matrix([
//   [1, 1, 5, 8, 8],
//   [3, 5, 6, 3, 8],
//   [7, 6, 7, 6, 1],
//   [2, 0, 8, 8, 5],
//   [2, 8, 9, 7, 5],
// ]);

// const matrix6 = new Matrix([
//   [5, 5, 3, 3, 3],
//   [7, 3, 4, 1, 0],
//   [0, 0, 6, 5, 3],
//   [1, 5, 7, 2, 3],
//   [3, 8, 9, 0, 8],
// ]);

// const A = new Vector(3, [1, 2, 3]);
// const B = new Row(3, [1, 2, 3]);

// console.log(A, B);


const myU = new Matrix(6, 6, [
    [2, 2, 2, 2, 2, 2],
    [0, 2, 2, 2, 2, 2],
    [0, 0, 2, 2, 2, 2],
    [0, 0, 0, 2, 2, 2],
    [0, 0, 0, 0, 2, 2],
    [0, 0, 0, 0, 0, 2],
]);

const A = myU.transpose().multiply(myU);

const U = A.findU();

console.log(myU.isEqualTo(U));

// Counting additions and multiplications
// console.log(additions, multiplications);

// Not a positive definite matrix

const B = new Matrix(3, 3, [
  [-4, 4, 8],
  [4, -1, 16],
  [8, 16, -1],
]);

console.log(B.findU()); // Infinities in result