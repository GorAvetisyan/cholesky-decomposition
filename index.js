function transpose(matrix){

    const transposedMatrix = Array(matrix.length).fill().map(()=>Array(matrix[0].length).fill());

    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            transposedMatrix[i][j] = matrix[j][i];            
        }        
    }

    return transposedMatrix;
}

function isEqual(matrix1,matrix2){
    for (let i = 0; i < matrix1.length; i++) {
        for (let j = 0; j < matrix1.length; j++) {
            if (matrix1[i][j]!==matrix2[i][j]) {
                return false;
            }
        }        
    }
    return true;
}

const A = [
    [1, 2, 3],
    [2, 5, 6],
    [3, 6, 9],
];


const C = [
    [1, 2, 38],
    [47, 5, 6],
    [7, 8, 9],
];

const isSymmetric = (A) => isEqual(A, transpose(A));

