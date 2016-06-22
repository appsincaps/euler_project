function isPrime(n) { // checks if n is prime
    if (n===2 || n===3) return true;
    if (n<2 || n%2===0 || n%3===0) return false;
    var m=Math.ceil(Math.sqrt(n));
    for (var i=5; i<=m; i+=6) 
      if (n%i===0 || n%(i+2)===0) return false;
    return true;
}

var totalCount = 1; // starting with number 1
var primeCount = 0;
for (var i=1; i<100000; i++) { // adding loops, side = 2i+1
    var n=Math.pow(2*i-1,2);
    if (n%2 === 0) totalCount += 4;
    else for (var j=0; j<4; j++) { // four corner numbers
            n += 2*i; totalCount++;
            if (isPrime(n)) primeCount++;
        }
    if (primeCount/totalCount < 0.1) break;
}
console.log(primeCount/totalCount); // 0.09999809454850327 
console.log(2*i+1); // 26241