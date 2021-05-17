let fixed = 4;
  
  function diagonalize(M, A) {
    var m = M.length;
    var n = M[0].length;
    for(var k=0; k<Math.min(m,n); ++k) {
      // Find the k-th pivot
      let i_max = findPivot(M, k);
      if (!A[i_max][k]){
        alert("Матрица вырождена и рождена свыше")
        return true;
      }
      swap_rows(M, k, i_max, A);
      // Do for all rows below pivot
      for(var i=k+1; i<m; ++i) {
        // Do for all remaining elements in current row:
        var c = +(A[i][k] / A[k][k]).toFixed(fixed);
        for(var j=k+1; j<n; ++j) {
          A[i][j] = +(A[i][j] - A[k][j] * c).toFixed(fixed);
        }
        // Fill lower triangular matrix with zeros
        A[i][k] = 0;
      }
    }
  }
  
  function findPivot(M, k) {
    var i_max2 = k;
    for(var i=k+1; i<M.length; ++i) {
      if (Math.abs(M[i][k]) > Math.abs(M[i_max2][k])) {
        i_max2 = i;
      }
    }
    return i_max2;
  }
  
  function swap_rows(M, i_max, k, A) {
    if (i_max !== k) {
      var temp = A[i_max];
      A[i_max] = A[k];
      A[k] = temp;
    }
  }
  
  function substitute(M) {
    var m = M.length;
    let n = M[0].length
    for (let i = m-1; i>=0; i--){
        let coeff = M[i][i];
        for(let k = 0; k < n; k++ )
                if (!!M[i][k])
                    M[i][k] = +(M[i][k] / coeff).toFixed(fixed);
    }
    for(var i=m-1; i>=0; --i) {
        
      for(var j=i-1; j>=0; --j) {
        var x = +(M[j][i] / M[i][i]).toFixed(fixed);
          for(let k = 0; k < n; k++ ){
              M[j][k] = +(M[j][k] - M[i][k] * x).toFixed(fixed);
          }
      } 
    }
    return M;
}
  
  function extractX(A) {
    var x = [];
    var m = A.length;
    var n = A[0].length;
    for(var i=0; i<m; ++i){
      x.push(A[i][n-1]);
    }
    return x;
  }
  function toFixedNumber(A){
      for (let i = 0; i < A.length; i++)
        for (let j = 0; j < A[0].length; j++){
            A[i][j] = +(A[i][j]).toFixed(2);
        }
      return A;
  }
  
  export default function GaussSolution(A) {
    // print(A, "A");
    let error = diagonalize(A, A);
    if (error)
      return false;
    //print(A, "diag");
    let res = substitute(A);
    // print(A, "subst");
    extractX(A);
    res = toFixedNumber(res)
    // print(res, "RES")
    // print(x, "x");
    return res;
  }
  
  // sample from: http://mathworld.wolfram.com/GaussianElimination.html
