const {Matrix} = require('../Matrix');

describe('Matrix constructor', () => {
  it('should create a matrix with the given dimensions and initialize elements to 0 if no array is provided', () => {
    const matrix = new Matrix(2, 3);
    const expectedMatrix = [
      [0, 0, 0],
      [0, 0, 0],
    ];

    expect(matrix.matrix).toEqual(expectedMatrix);
  });

  it('should create a matrix with the given dimensions and initialize elements using the provided array', () => {
    const array = [
      [1, 2, 3],
      [4, 5, 6],
    ];

    const matrix = new Matrix(2, 3, array);

    expect(matrix.matrix).toEqual(array);
  });

  it('should throw an error for non-array input', () => {
    const createMatrixWithInvalidInput = () => {
      new Matrix(2, 3, 'invalid');
    };

    expect(createMatrixWithInvalidInput).toThrowError('input must be an array with 2 elements');
  });

  it('should throw an error for an array with incorrect number of rows', () => {
    const array = [
      [1, 2, 3],
    ];

    const createMatrixWithInvalidRows = () => {
      new Matrix(2, 3, array);
    };

    expect(createMatrixWithInvalidRows).toThrowError('input must be an array with 2 elements');
  });

  it('should throw an error for an array with incorrect number of elements in a row', () => {
    const array = [
      [1, 2, 3],
      [4, 5],
    ];

    const createMatrixWithInvalidElements = () => {
      new Matrix(2, 3, array);
    };

    expect(createMatrixWithInvalidElements).toThrowError('2th row must be an array with 3 elements');
  });

  it('should throw an error for non-natural numbers as dimensions', () => {
    const createMatrixWithInvalidDimensions = () => {
      new Matrix(0, -3);
    };

    expect(createMatrixWithInvalidDimensions).toThrowError('n and m must be natural numbers');
  });

  it('should throw an error for non-number elements in the array', () => {
    const array = [
      [1, 'invalid', 3],
      [4, 5, 6],
    ];

    const createMatrixWithInvalidElements = () => {
      new Matrix(2, 3, array);
    };

    expect(createMatrixWithInvalidElements).toThrowError('matrix[1][2] must be a number got string');
  });
});

describe('Matrix transpose method', () => {
  it('should transpose a square matrix', () => {
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

  it('should transpose a rectangular matrix', () => {
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

  it('should transpose a matrix with one row', () => {
    const matrix = new Matrix(1, 3, [[1, 2, 3]]);

    const transposedMatrix = matrix.transpose();

    const expectedTransposedMatrix = new Matrix(3, 1, [
      [1],
      [2],
      [3],
    ]);

    expect(transposedMatrix.matrix).toEqual(expectedTransposedMatrix.matrix);
  });

  it('should transpose a matrix with one column', () => {
    const matrix = new Matrix(4, 1, [
      [1],
      [2],
      [3],
      [4],
    ]);

    const transposedMatrix = matrix.transpose();

    const expectedTransposedMatrix = new Matrix(1, 4, [
      [1, 2, 3, 4],
    ]);

    expect(transposedMatrix.matrix).toEqual(expectedTransposedMatrix.matrix);
  });

});