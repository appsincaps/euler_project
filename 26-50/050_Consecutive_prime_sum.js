function isPrime(n) { // checks if n is prime
    if (n===2 || n===3) return true;
    if (n<2 || n%2===0 || n%3===0) return false;
    var m=Math.ceil(Math.sqrt(n));
    for (var i=5; i<=m; i+=6) 
      if (n%i===0 || n%(i+2)===0) return false;
    return true;
}

var res, m=0;
for (var s,i=2; i<1000; i++) {
    s = 0;
    for (var j=i,k=0; s<1000000; j++) {
        if (isPrime(j)) {
            s += j; k++;
            if (isPrime(s)) {
                if (k>m) {m=k;res=[i,j,s]}
            }
        }
    }
}

console.log(m,res); // 543 [ 6, 3931, 997651 ]  
