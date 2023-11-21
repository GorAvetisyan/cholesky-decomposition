const { Matrix } = require("../Matrix");

describe("Matrix determinant method", () => {
  it("should calculate the determinant of a 1x1 matrix", () => {
    const matrix = new Matrix(1, 1, [[5]]);
    const result = matrix.determinant();
    expect(result).toEqual(5);
  });

  it("should calculate the determinant of a 2x2 matrix", () => {
    const matrix = new Matrix(2, 2, [
      [1, 2],
      [3, 4],
    ]);
    const result = matrix.determinant();
    expect(result).toEqual(-2);
  });

  it("should calculate the determinant of a 3x3 matrix", () => {
    const matrix = new Matrix(3, 3, [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ]);
    const result = matrix.determinant();
    expect(result).toEqual(0);
  });

  it("should calculate the determinant of a 4x4 matrix", () => {
    const matrix = new Matrix(4, 4, [
      [1, 2, 3, 4],
      [5, 6, 7, 8],
      [9, 10, 11, 12],
      [13, 14, 15, 16],
    ]);
    const result = matrix.determinant();
    expect(result).toEqual(0);
  });

  it("should calculate the determinant of a 5x5 matrix with non-zero determinant", () => {
    const matrix = new Matrix(5, 5, [
      [2, 1, 3, 4, 5],
      [0, 1, 0, 2, 0],
      [1, 2, 3, 0, 1],
      [4, 5, 6, 7, 8],
      [2, 1, 0, 3, 4],
    ]);
    const result = matrix.determinant();
    expect(result).toEqual(18);
  });

  it("should throw an error for a non-square matrix", () => {
    const matrix = new Matrix(2, 3, [
      [1, 2, 3],
      [4, 5, 6],
    ]);

    const calculateDeterminant = () => {
      matrix.determinant();
    };

    expect(calculateDeterminant).toThrowError(
      "This works only for square matrices",
    );
  });
});
