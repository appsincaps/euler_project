function isPrime(n) { // checks if n is prime
    if (n===2 || n===3) return true;
    if (n<2 || n%2===0 || n%3===0) return false;
    var m=Math.ceil(Math.sqrt(n));
    for (var i=5; i<=m; i+=6) 
      if (n%i===0 || n%(i+2)===0) return false;
    return true;
}

function noSolution(x) { // returns true if no solution found
    for (var i=1; i<Math.sqrt(x/2); i++)
        if (isPrime(n-2*i*i)) return false;
    return true;
}

for (var n=3;; n+=2)
    if (!isPrime(n))
        if (noSolution(n)) break;
console.log(n); // 5777