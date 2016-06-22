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
  
  return function(num) {
    while (num >= primes.length) nextPrime();
    return primes[num];
  };
}();

function isPrime(n) {
    var m = Math.sqrt(n);
    for (var i=0; prime(i)<m; i++) {
        if (n%prime(i) === 0) return false;
    }
    return true;
}

for (var n=1e4+1; 2*n*prime(n-1)<=1e10; n+=2) {}
console.log(n); // 21035