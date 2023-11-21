const { Matrix } = require("../Matrix");

describe("Matrix isUpperTriangular method", () => {
  it("should return true for a 3x3 upper triangular matrix", () => {
    const matrix = new Matrix(3, 3, [
      [1, 2, 3],
      [0, 4, 5],
      [0, 0, 6],
    ]);
    const result = matrix.isUpperTriangular();
    expect(result).toBe(true);
  });

  it("should return true for a 2x2 upper triangular matrix", () => {
    const matrix = new Matrix(2, 2, [
      [7, 8],
      [0, 3],
    ]);
    const result = matrix.isUpperTriangular();
    expect(result).toBe(true);
  });

  it("should return false for a 3x3 non-upper triangular matrix", () => {
    const matrix = new Matrix(3, 3, [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ]);
    const result = matrix.isUpperTriangular();
    expect(result).toBe(false);
  });

  it("should return false for a non-square matrix", () => {
    const matrix = new Matrix(2, 3, [
      [1, 2, 3],
      [4, 5, 6],
    ]);
    const result = matrix.isUpperTriangular();
    expect(result).toBe(false);
  });

  it("should return true for a 1x1 matrix (trivially upper triangular)", () => {
    const matrix = new Matrix(1, 1, [[7]]);
    const result = matrix.isUpperTriangular();
    expect(result).toBe(true);
  });
});
