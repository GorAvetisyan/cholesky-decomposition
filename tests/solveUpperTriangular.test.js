const { Matrix, Vector } = require("../Matrix");

// matrix.test.js
describe("Matrix solveUpperTriangular method with Vector", () => {
  it("should solve a simple 2x2 upper triangular system with vectors", () => {
    const matrix = new Matrix(2, 2, [
      [2, 3],
      [0, 4],
    ]);

    const vector = new Vector(2, [8, 16]);
    const solution = matrix.solveUpperTriangular(vector);

    expect(solution).toBeInstanceOf(Vector);
    expect(solution.matrix).toEqual([[-2], [4]]);
  });

  it("should solve a 3x3 upper triangular system with vectors", () => {
    const matrix = new Matrix(3, 3, [
      [2, 3, 1],
      [0, 4, 5],
      [0, 0, 3],
    ]);

    const vector = new Vector(3, [8, 16, 9]);
    const solution = matrix.solveUpperTriangular(vector);

    expect(solution).toBeInstanceOf(Vector);
    expect(solution.matrix).toEqual([[2.125], [0.25], [3]]);
  });

  it("should throw error zero on diagonal", () => {
    const matrix = new Matrix(3, 3, [
      [2, 3, 1],
      [0, 0, 5],
      [0, 0, 3],
    ]);

    const vector = new Vector(3, [8, 16, 9]);
    expect(() => matrix.solveUpperTriangular(vector)).toThrowError();
  });
});
