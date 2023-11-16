class Matrix{
    
    // are n, m required for contructor ?

    constructor(matrix){

        if(Array.isArray(matrix)){

            let n = matrix.length;
            let m;

            for (let i = 0; i < n; i++) {
                if(Array.isArray(matrix[i])){
                    if(m == undefined){
                        m = matrix[i].length;
                    }else{
                        if(matrix[i].length == m){
                            for (let j = 0; j < m; j++) {
                                if(typeof matrix[i][j] !== 'number'){
                                    throw Error(`Matrix elements must be numbers: matrix[${i+1}][${j+1}] is ${typeof matrix[i][j]}`);
                                }
                            }
                        }else{
                            throw Error(`${i+1}th row need to have ${m} elements`);
                        }
                    }
                }else{
                    throw Error(`${i+1}th row must be an array, got an ${typeof matrix[i]}`);
                }
    }

            this.n = n;
            this.m = m;
            this.matrix = matrix;

        }else{
            throw Error(`Matrix must be an array, got a ${typeof matrix}`);
        }
    }

    isSquare(){ return this.m == this.n}

    isSymmetric(){
        return this.isEqualTo(this.transpose());
    }

    isEqualTo(B){
        if(this.n == B.n && this.m == B.m){
            for (let i = 0; i < this.n; i++) {
                for (let j = 0; j < this.m; j++) {
                    if(this.matrix[i][j] !== B.matrix[i][j]) return false;
                }                
            }

            return true;
        }else{
            return false;
        }
    }

    transpose(){
        const transposedMatrix = Array(this.m).fill().map(()=>Array(this.n).fill());

        for (let i = 0; i < this.n; i++) {
            for (let j = 0; j < this.m; j++) {
                transposedMatrix[j][i] = this.matrix[i][j];
            }            
        }

        console.log(transposedMatrix)
        return new Matrix(transposedMatrix);
  getMinorOfElem(elemRow, elemCol) {
    const n = this.n;
    const minorMatrix = [];

    for (let i = 0; i < n; i++) {
      const row = [];

      if (i == elemRow) continue;

      for (let j = 0; j < n; j++) {
        if (j == elemCol) continue;

        row.push(this.matrix[i][j]);
      }

      minorMatrix.push(row);
    }

    return minorMatrix;
    }

    determinant(){

    }

    type(){
        return `Your matrix is ${this.n}x${this.m} type.`
    }

    print(){

    }

}


const A = new Matrix([[1, 0], [0, 1]]);

