const { Matrix, Vector } = require("../Matrix");

describe("Solving by Cholesky decomposition", () => {
    
  // Good example

  //   it("should solve", () => {
  //     const matrix = new Matrix(3, 3, [
  //       [6, 15, 55],
  //       [15, 55, 225],
  //       [55, 225, 979],
  //     ]);

  //     const vector = new Vector(3, [76, 295, 1259]);

  //     const solution = matrix.solveByCD(vector);

  //     expect(solution.matrix).toEqual([[1], [1], [1]]);
  //   });

  it("should solve", () => {
    const matrix = new Matrix(3, 3, [
      [4, 10, 8],
      [10, 26, 26],
      [8, 26, 61],
    ]);

    const vector = new Vector(3, [44, 128, 214]);

    const solution = matrix.solveByCD(vector);

    expect(solution.matrix).toEqual([[-8], [6], [2]]);
  });
});
