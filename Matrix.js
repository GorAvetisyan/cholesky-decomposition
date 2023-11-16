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

    return new Matrix(minorMatrix);
    }

  determinant() {
    const n = this.matrix.length;
    let sum = 0;
    if (n > 2) {
      for (let i = 0; i < n; i++) {
        sum +=
          Math.pow(-1, i) *
          this.matrix[0][i] *
          this.getMinorOfElem(0, i).determinant();
      }
    } else {
      return (
        this.matrix[0][0] * this.matrix[1][1] -
        this.matrix[0][1] * this.matrix[1][0]
      );
    }

    return sum;
  }

  scale(x) {
    let scaledMatrix = [];
    for (let i = 0; i < this.n; i++) {
      let row = [];
      for (let j = 0; j < this.m; j++) {
        row.push(x * this.matrix[i][j]);
      }
      scaledMatrix.push(row);
    }
    return new Matrix(scaledMatrix);
    }

  add(B) {
    let result = [];
    if (B instanceof Matrix) {
      if (this.m === B.m && this.n === B.n) {
        for (let i = 0; i < this.n; i++) {
          let row = [];
          for (let j = 0; j < this.m; j++) {
            row.push(this.matrix[i][j] + B.matrix[i][j]);
          }
          result.push(row);
        }
      } else {
        throw Error(`You can not add ${this.type()} and ${B.type()} matrices`);
      }
    } else {
      throw Error("Your input isn't Matrix");
    }
    return new Matrix(result);
  }
