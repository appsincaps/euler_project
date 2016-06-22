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

function psums(n,m) { // returns number of prime summations to get n with max prime #m
    var p = prime(m);
    if (p>n) return 0;
    if (m===0 && n%2===1) return 0;
    if (p===n) return 1;
    if (m===0 && n%2===0) return 1;
    var s = 0;
    while (n>=p) {
        n -= p; 
        if (n===0) {s += 1; break;}
        var k = m-1;
        while (k>=0) s += psums(n,k--);
    }
    return s;
}

function summations(num) { // sum all combinations ordered by max prime number in summation
    for (var s=0,i=0; i<num; i++) s += psums(num,i);
    return s;
}

function find() {
    var num=10, sums=summations(num);
    while (sums<=5000) {
        sums=summations(++num);
    }
    return num;
}

console.log(find()); // 71