const { Matrix } = require("../Matrix");

describe("Matrix add method", () => {
  it("should add two matrices with matching dimensions", () => {
    const matrixA = new Matrix(2, 3, [
      [1, 2, 3],
      [4, 5, 6],
    ]);

    const matrixB = new Matrix(2, 3, [
      [7, 8, 9],
      [10, 11, 12],
    ]);

    const resultMatrix = matrixA.add(matrixB);

    const expectedResultMatrix = new Matrix(2, 3, [
      [8, 10, 12],
      [14, 16, 18],
    ]);

    expect(resultMatrix.matrix).toEqual(expectedResultMatrix.matrix);
  });

  it("should throw an error for adding matrices with mismatched dimensions", () => {
    const matrixA = new Matrix(2, 3, [
      [1, 2, 3],
      [4, 5, 6],
    ]);

    const matrixB = new Matrix(3, 2, [
      [7, 8],
      [10, 11],
      [13, 14],
    ]);

    const addMatricesWithMismatchedDimensions = () => {
      matrixA.add(matrixB);
    };

    expect(addMatricesWithMismatchedDimensions).toThrowError(
      `You can not add ${matrixA.type()} and ${matrixB.type()} matrices`,
    );
  });

  it("should throw an error for adding a non-matrix", () => {
    const matrixA = new Matrix(2, 3, [
      [1, 2, 3],
      [4, 5, 6],
    ]);

    const addNonMatrix = () => {
      matrixA.add("invalid");
    };

    expect(addNonMatrix).toThrowError("Your input isn't Matrix");
  });
});
