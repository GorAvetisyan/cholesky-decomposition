const { Matrix } = require("../Matrix");

describe("Matrix getMinorOfElem method", () => {
  it("should get the minor matrix of an element in a square matrix", () => {
    const matrix = new Matrix(3, 3, [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ]);

    const minorMatrix = matrix.getMinorOfElem(2, 2);

    const expectedMinorMatrix = new Matrix(2, 2, [
      [1, 3],
      [7, 9],
    ]);

    expect(minorMatrix.matrix).toEqual(expectedMinorMatrix.matrix);
  });

  it("error because of invalid indexes", () => {
    const matrix = new Matrix(3, 3, [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ]);

    expect(() => matrix.getMinorOfElem(4, 2)).toThrow("Invalid indexes");
  });

  it("should get the minor matrix of an element in a rectangular matrix", () => {
    const matrix = new Matrix(3, 4, [
      [1, 2, 3, 4],
      [5, 6, 7, 8],
      [9, 10, 11, 12],
    ]);

    const minorMatrix = matrix.getMinorOfElem(2, 2);

    const expectedMinorMatrix = new Matrix(2, 3, [
      [1, 3, 4],
      [9, 11, 12],
    ]);

    expect(minorMatrix.matrix).toEqual(expectedMinorMatrix.matrix);
  });
});
