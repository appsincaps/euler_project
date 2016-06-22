function primeFactors(x) {
    var primes = [];
    for (var i=2,j=0; x>1; j=0,i++) {
        while (x%i===0) {
            x /= i; j++;
        }
        if (j>0) primes.push([i,j]);
    }
    return primes;
}

var count = 0;
for (var n=100; count<4; n++)
    if (primeFactors(n).length>3) count++;
    else count = 0;

console.log(n-4); // 134043
