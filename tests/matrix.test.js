const { Matrix } = require("../Matrix");

describe("Matrix constructor", () => {
  it("should create a matrix with the given dimensions and initialize elements to 0 if no array is provided", () => {
    const matrix = new Matrix(2, 3);
    const expectedMatrix = [
      [0, 0, 0],
      [0, 0, 0],
    ];

    expect(matrix.matrix).toEqual(expectedMatrix);
  });

  it("should create a matrix with the given dimensions and initialize elements using the provided array", () => {
    const array = [
      [1, 2, 3],
      [4, 5, 6],
    ];

    const matrix = new Matrix(2, 3, array);

    expect(matrix.matrix).toEqual(array);
  });

  it("should throw an error for non-array input", () => {
    const createMatrixWithInvalidInput = () => {
      new Matrix(2, 3, "invalid");
    };

    expect(createMatrixWithInvalidInput).toThrowError(
      "input must be an array with 2 elements",
    );
  });

  it("should throw an error for an array with incorrect number of rows", () => {
    const array = [[1, 2, 3]];

    const createMatrixWithInvalidRows = () => {
      new Matrix(2, 3, array);
    };

    expect(createMatrixWithInvalidRows).toThrowError(
      "input must be an array with 2 elements",
    );
  });

  it("should throw an error for an array with incorrect number of elements in a row", () => {
    const array = [
      [1, 2, 3],
      [4, 5],
    ];

    const createMatrixWithInvalidElements = () => {
      new Matrix(2, 3, array);
    };

    expect(createMatrixWithInvalidElements).toThrowError(
      "2th row must be an array with 3 elements",
    );
  });

  it("should throw an error for non-natural numbers as dimensions", () => {
    const createMatrixWithInvalidDimensions = () => {
      new Matrix(0, -3);
    };

    expect(createMatrixWithInvalidDimensions).toThrowError(
      "n and m must be natural numbers",
    );
  });

  it("should throw an error for non-number elements in the array", () => {
    const array = [
      [1, "invalid", 3],
      [4, 5, 6],
    ];

    const createMatrixWithInvalidElements = () => {
      new Matrix(2, 3, array);
    };

    expect(createMatrixWithInvalidElements).toThrowError(
      "matrix[1][2] must be a number got string",
    );
  });
});

describe("Matrix transpose method", () => {
  it("should transpose a square matrix", () => {
    const matrix = new Matrix(3, 3, [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ]);

    const transposedMatrix = matrix.transpose();

    const expectedTransposedMatrix = new Matrix(3, 3, [
      [1, 4, 7],
      [2, 5, 8],
      [3, 6, 9],
    ]);

    expect(transposedMatrix.matrix).toEqual(expectedTransposedMatrix.matrix);
  });

  it("should transpose a rectangular matrix", () => {
    const matrix = new Matrix(2, 4, [
      [1, 2, 3, 4],
      [5, 6, 7, 8],
    ]);

    const transposedMatrix = matrix.transpose();

    const expectedTransposedMatrix = new Matrix(4, 2, [
      [1, 5],
      [2, 6],
      [3, 7],
      [4, 8],
    ]);

    expect(transposedMatrix.matrix).toEqual(expectedTransposedMatrix.matrix);
  });

  it("should transpose a matrix with one row", () => {
    const matrix = new Matrix(1, 3, [[1, 2, 3]]);

    const transposedMatrix = matrix.transpose();

    const expectedTransposedMatrix = new Matrix(3, 1, [[1], [2], [3]]);

    expect(transposedMatrix.matrix).toEqual(expectedTransposedMatrix.matrix);
  });

  it("should transpose a matrix with one column", () => {
    const matrix = new Matrix(4, 1, [[1], [2], [3], [4]]);

    const transposedMatrix = matrix.transpose();

    const expectedTransposedMatrix = new Matrix(1, 4, [[1, 2, 3, 4]]);

    expect(transposedMatrix.matrix).toEqual(expectedTransposedMatrix.matrix);
  });
});

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

describe("Matrix determinant method", () => {
  it("should calculate the determinant of a 1x1 matrix", () => {
    const matrix = new Matrix(1, 1, [[5]]);
    const result = matrix.determinant();
    expect(result).toEqual(5);
  });

  it("should calculate the determinant of a 2x2 matrix", () => {
    const matrix = new Matrix(2, 2, [
      [1, 2],
      [3, 4],
    ]);
    const result = matrix.determinant();
    expect(result).toEqual(-2);
  });

  it("should calculate the determinant of a 3x3 matrix", () => {
    const matrix = new Matrix(3, 3, [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ]);
    const result = matrix.determinant();
    expect(result).toEqual(0);
  });

  it("should calculate the determinant of a 4x4 matrix", () => {
    const matrix = new Matrix(4, 4, [
      [1, 2, 3, 4],
      [5, 6, 7, 8],
      [9, 10, 11, 12],
      [13, 14, 15, 16],
    ]);
    const result = matrix.determinant();
    expect(result).toEqual(0);
  });

  it("should calculate the determinant of a 5x5 matrix with non-zero determinant", () => {
    const matrix = new Matrix(5, 5, [
      [2, 1, 3, 4, 5],
      [0, 1, 0, 2, 0],
      [1, 2, 3, 0, 1],
      [4, 5, 6, 7, 8],
      [2, 1, 0, 3, 4],
    ]);
    const result = matrix.determinant();
    expect(result).toEqual(18);
  });

  it("should throw an error for a non-square matrix", () => {
    const matrix = new Matrix(2, 3, [
      [1, 2, 3],
      [4, 5, 6],
    ]);

    const calculateDeterminant = () => {
      matrix.determinant();
    };

    expect(calculateDeterminant).toThrowError(
      "This works only for square matrices",
    );
  });
});

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
