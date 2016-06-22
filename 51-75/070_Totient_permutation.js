var prime = function primeGen() { // prime generator
  
  var primes = [2,3,5], count = 0;
  function isPrime(n) {
    if (n%3===0) return false;
    var m=Math.ceil(Math.sqrt(n));
    for (var i=5; i<=m; i+=6) 
      if (n%i===0 || n%(i+2)===0) return false;
    return true;
  }
  
  return {
    reset: function() {count = 0;},
    next: function() {
      while (count >= primes.length) {
        var n = primes[primes.length-1]+2;
        while (!(isPrime(n))) n += 2;
        primes.push(n);
      }
      return primes[count++];
    }
  };
}();

function isPrime(n) { // checks if n is prime
    if (n===2 || n===3) return true;
    if (n<2 || n%2===0 || n%3===0) return false;
    var m=Math.ceil(Math.sqrt(n));
    for (var i=5; i<=m; i+=6) 
      if (n%i===0 || n%(i+2)===0) return false;
    return true;
}
function digits(n) { // return sorted digits from a number
    return n.toString().split('').sort().join('');
}

function factors(n) { // returns prime factors of a number
    var p, f=[];
    prime.reset();
    while (n > 1) {
        var count = 0;
        p = prime.next();
        if (n%p===0) {
            while (n%p===0) {n /= p; count++;}
            f.push([p,count]);
        }
    }
    return f;
}
// check the hint from the problem
console.log(factors(87109)); // [ [ 11, 1 ], [ 7919, 1 ] ] - product of two primes

var max = 10000000; // largest number
var start = ~~Math.sqrt(max)-1, // smallest prime less than max
    maxN = 0, minR = 2;

for (var p1=start; p1>100; p1-=2) { // the same idea that n = p1*p2
    if (!isPrime(p1)) continue;
    for (var p2=p1,n=p1*p2; n<max; p2+=2,n=p1*p2) {
        if (!isPrime(p2)) continue;
        var tot = Math.round(n*(1-1/p1)*(1-1/p2)), r = n/tot;
        if (digits(n) !== digits(tot)) continue;
        if (r<minR) {minR=r; maxN=n; console.log(n,tot,r,p1,p2);}
    }
}
console.log(maxN); // 8319823
