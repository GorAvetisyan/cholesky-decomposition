const { Matrix } = require("../Matrix");

describe("Matrix multiplication", () => {
  test("Multiplying compatible matrices should return the correct result", () => {
    const A = new Matrix(2, 3, [
      [1, 2, 3],
      [4, 5, 6],
    ]);
    const B = new Matrix(3, 2, [
      [7, 8],
      [9, 10],
      [11, 12],
    ]);
    const result = A.multiply(B);
    expect(result.matrix).toEqual([
      [58, 64],
      [139, 154],
    ]);
  });

  test("Multiplying incompatible matrices should throw an error", () => {
    const A = new Matrix(2, 3, [
      [1, 2, 3],
      [4, 5, 6],
    ]);
    const C = new Matrix(4, 4, [
      [1, 2, 3, 4],
      [5, 6, 7, 8],
      [9, 10, 11, 12],
      [13, 14, 15, 16],
    ]);
    expect(() => A.multiply(C)).toThrow(
      `You can't multiply ${A.type()} matrix with ${C.type()} matrix`,
    );
  });

  test("Multiplying with non-matrix input should throw an error", () => {
    const A = new Matrix(2, 3, [
      [1, 2, 3],
      [4, 5, 6],
    ]);
    const invalidInput = "not a matrix";
    expect(() => A.multiply(invalidInput)).toThrow("Your input isn't a matrix");
  });

  test("Multiplying matrices with zero elements should return a zero-filled matrix", () => {
    const A = new Matrix(2, 3, [
      [0, 0, 0],
      [0, 0, 0],
    ]);
    const B = new Matrix(3, 2, [
      [0, 0],
      [0, 0],
      [0, 0],
    ]);
    const result = A.multiply(B);
    const expected = new Matrix(2, 2, [
      [0, 0],
      [0, 0],
    ]);
    expect(result.matrix).toEqual(expected.matrix);
  });
});
