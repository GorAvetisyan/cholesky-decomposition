const { Matrix } = require("../Matrix");

describe("Matrix transpose method", () => {
  it("should transpose a square matrix", () => {
    const matrix = new Matrix(3, 3, [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ]);

    const transposedMatrix = matrix.transpose();

    const expectedTransposedMatrix = new Matrix(3, 3, [
      [1, 4, 7],
      [2, 5, 8],
      [3, 6, 9],
    ]);

    expect(transposedMatrix.matrix).toEqual(expectedTransposedMatrix.matrix);
  });

  it("should transpose a rectangular matrix", () => {
    const matrix = new Matrix(2, 4, [
      [1, 2, 3, 4],
      [5, 6, 7, 8],
    ]);

    const transposedMatrix = matrix.transpose();

    const expectedTransposedMatrix = new Matrix(4, 2, [
      [1, 5],
      [2, 6],
      [3, 7],
      [4, 8],
    ]);

    expect(transposedMatrix.matrix).toEqual(expectedTransposedMatrix.matrix);
  });

  it("should transpose a matrix with one row", () => {
    const matrix = new Matrix(1, 3, [[1, 2, 3]]);

    const transposedMatrix = matrix.transpose();

    const expectedTransposedMatrix = new Matrix(3, 1, [[1], [2], [3]]);

    expect(transposedMatrix.matrix).toEqual(expectedTransposedMatrix.matrix);
  });

  it("should transpose a matrix with one column", () => {
    const matrix = new Matrix(4, 1, [[1], [2], [3], [4]]);

    const transposedMatrix = matrix.transpose();

    const expectedTransposedMatrix = new Matrix(1, 4, [[1, 2, 3, 4]]);

    expect(transposedMatrix.matrix).toEqual(expectedTransposedMatrix.matrix);
  });
});
