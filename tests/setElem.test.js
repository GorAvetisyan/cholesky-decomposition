const { Matrix } = require("../Matrix");

describe("Matrix setElem method", () => {
  it("throw error on invalid indexes", () => {
    const matrix = new Matrix(3, 3, [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ]);

    expect(() => matrix.setElem(7, 4, 5)).toThrowError("Invalid indexes");
  });
});
