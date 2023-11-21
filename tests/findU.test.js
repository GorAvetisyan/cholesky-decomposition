const { Matrix } = require("../Matrix");

describe("Matrix findU method (Cholesky decomposition)", () => {
  it("should decompose a symmetric matrix into the upper triangular matrix U", () => {
    const symmetricMatrix = new Matrix(3, 3, [
      [4, 12, -16],
      [12, 37, -43],
      [-16, -43, 98],
    ]);

    const U = symmetricMatrix.findU();

    const expectedU = new Matrix(3, 3, [
      [2, 6, -8],
      [0, 1, 5],
      [0, 0, 3],
    ]);

    expect(U.matrix).toEqual(expectedU.matrix);
  });

  it("should throw an error for a non-symmetric matrix", () => {
    const nonSymmetricMatrix = new Matrix(2, 2, [
      [1, 2],
      [3, 4],
    ]);

    const findUForNonSymmetricMatrix = () => {
      nonSymmetricMatrix.findU();
    };

    expect(findUForNonSymmetricMatrix).toThrowError(
      "This works only for symmetric matrices",
    );
  });
});
