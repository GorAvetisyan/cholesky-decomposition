const { Matrix } = require("../Matrix");

describe("Matrix isStrictDiagonalDominant method", () => {
  it("should return true for a 3x3 strictly diagonally dominant matrix", () => {
    const matrix = new Matrix(3, 3, [
      [5, -2, 0],
      [-1, 8, -3],
      [2, -1, 4],
    ]);
    const result = matrix.isStrictDiagonalDominant();
    expect(result).toBe(true);
  });

  it("should return false for a 3x3 matrix that is not -->strictly<-- diagonally dominant", () => {
    const matrix = new Matrix(3, 3, [
      [5, 2, 3],
      [4, 10, 6],
      [7, 8, 15],
    ]);
    const result = matrix.isStrictDiagonalDominant();
    expect(result).toBe(false);
  });

  it("should return false for a non-square matrix", () => {
    const matrix = new Matrix(3, 2, [
      [1, 2],
      [4, 5],
      [7, 8],
    ]);
    const result = matrix.isStrictDiagonalDominant();
    expect(result).toBe(false);
  });

  it("should return false for a matrix with a zero diagonal element", () => {
    const matrix = new Matrix(3, 3, [
      [2, -1, 4],
      [-1, 0, 1],
      [1, 2, 4],
    ]);
    const result = matrix.isStrictDiagonalDominant();
    expect(result).toBe(false);
  });

  it("should return true for a 2x2 strictly diagonally dominant matrix", () => {
    const matrix = new Matrix(2, 2, [
      [5, -2],
      [-1, 3],
    ]);
    const result = matrix.isStrictDiagonalDominant();
    expect(result).toBe(true);
  });

  it("should return true for a 1x1 matrix (trivially diagonally dominant)", () => {
    const matrix = new Matrix(1, 1, [[7]]);
    const result = matrix.isStrictDiagonalDominant();
    expect(result).toBe(true);
  });
});
