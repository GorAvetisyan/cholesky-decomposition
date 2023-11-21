const { Matrix } = require("../Matrix");

describe("Matrix scale method", () => {
  it("should scale a matrix by a valid scalar", () => {
    const matrix = new Matrix(2, 3, [
      [1, 2, 3],
      [4, 5, 6],
    ]);

    const scaledMatrix = matrix.scale(2);

    const expectedScaledMatrix = new Matrix(2, 3, [
      [2, 4, 6],
      [8, 10, 12],
    ]);

    expect(scaledMatrix.matrix).toEqual(expectedScaledMatrix.matrix);
  });

  it("should scale a matrix by a valid scalar (negative)", () => {
    const matrix = new Matrix(2, 3, [
      [1, 2, 3],
      [4, 5, 6],
    ]);

    const scaledMatrix = matrix.scale(-0.5);

    const expectedScaledMatrix = new Matrix(2, 3, [
      [-0.5, -1, -1.5],
      [-2, -2.5, -3],
    ]);

    expect(scaledMatrix.matrix).toEqual(expectedScaledMatrix.matrix);
  });

  it("should throw an error for an invalid scalar input", () => {
    const matrix = new Matrix(2, 3, [
      [1, 2, 3],
      [4, 5, 6],
    ]);

    const scaleWithInvalidInput = () => {
      matrix.scale("invalid");
    };

    expect(scaleWithInvalidInput).toThrowError("Your input is not a number");
  });
});
