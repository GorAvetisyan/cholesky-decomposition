const { Matrix, Vector } = require("../Matrix");

describe("Matrix solveLowerTriangular method with Vector", () => {
  it("should solve a simple 2x2 upper triangular system with vectors", () => {
    const matrix = new Matrix(2, 2, [
      [4, 0],
      [3, 2],
    ]);

    const vector = new Vector(2, [16, 8]);
    const solution = matrix.solveLowerTriangular(vector);

    expect(solution.matrix).toEqual([[4], [-2]]);
  });

  it("should solve a 3x3 upper triangular system with vectors", () => {
    const matrix = new Matrix(3, 3, [
      [3, 0, 0],
      [5, 4, 0],
      [1, 3, 2],
    ]);

    const vector = new Vector(3, [9, 16, 8]);
    const solution = matrix.solveLowerTriangular(vector);

    expect(solution.matrix).toEqual([[3], [0.25], [2.125]]);
  });

  it("should throw error zero on diagonal", () => {
    const matrix = new Matrix(3, 3, [
      [3, 0, 0],
      [5, 0, 0],
      [1, 3, 2],
    ]);

    const vector = new Vector(3, [8, 16, 9]);
    expect(() => matrix.solveLowerTriangular(vector)).toThrowError();
  });
});
