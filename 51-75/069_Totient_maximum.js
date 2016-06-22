function primeGen() {
  
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
}
function dividers(n) {
    var p, numDiv = 1,
        prime = primeGen();
    prime.reset();
    while (n > 1) {
        var count = 1;
        p = prime.next();
        while (n%p===0) {n /= p; count++;}
        numDiv *= count;
    }
    return numDiv;
}
function totient(n) {
    var p, tot = n;
    prime.reset();
    while (n > 1) {
        p = prime.next();
        if (n%p === 0) {
            tot *= 1-1/p;
            while (n%p===0) n /= p;
        }
    }
    return Math.round(tot);
}

function maxTotient(max) {
    var maxN=1, maxRatio=1;
    for (var n=2; n<=max; n++) {
        var tot = totient(n),
            r = n/tot;
        if (r>maxRatio) {
            maxRatio = r;
            maxN = n;
        }
        if (n%10000===0) console.log(n);
    }
    return [maxN, maxRatio];
}
var prime = primeGen();
console.log(maxTotient(1000000)); // [ 510510, 5.539388020833333 ]
