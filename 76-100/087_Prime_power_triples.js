var prime = function primeGen() { // prime generator
  
  var primes = [2,3,5], count = 0;
  function isPrime(n) {
    if (n%3===0) return false;
    var m=Math.ceil(Math.sqrt(n));
    for (var i=5; i<=m; i+=6) 
      if (n%i===0 || n%(i+2)===0) return false;
    return true;
  }
  
  function nextPrime() {
    var n = primes[primes.length-1]+2;
    while (!(isPrime(n))) n += 2;
    primes.push(n);
    return n;
  }
  
  function primeNumber(num) { // gives prime #num or the last one
    if (num === undefined) num = primes.length-1;
    while (num >= primes.length) nextPrime();
    return primes[num];
  };
  
  function countPrimes(num) {
    if (num >= primes[primes.length-1]) {
        while (num >= primes[primes.length-1]) nextPrime();
        return primes.length-1;
    }
    var i=0;
    while (primes[i]<=num) i++;
    return i;
  }
  
  return {
      next: primeNumber,
      count: countPrimes
  }
  
}();

var M = 5e7,
    max = ~~Math.pow(M,1/4),
    count = 0,
    memo = [];
    
for (var i=0;; i++) {
    var n = prime.next(i), n4 = Math.pow(n,4);
    if (n>max) break;
    for (var j=0;; j++) {
        var m = prime.next(j),
            m3 = Math.pow(m,3);
        if (M<m3+n4) break;
        var y = ~~Math.sqrt(x);
        for (var k=0;; k++) {
            var p = prime.next(k),
                p2 = Math.pow(p,2),
                x = p2+m3+n4;
            if (M<=x) break;
            if (!memo[x]) { // make sure number is unique
                memo[x] = true;
                count ++;
            }
        }
    }
}

console.log(count); // 1097343