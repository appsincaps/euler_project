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

function factors(n) { // return array of prime factor indices
    var facts = [], i = 0;
    while (n > 1) {
        var m = 0,
            p = prime(i++);
        while (n%p === 0) {
            m++;
            n /= p;
        }
        facts.push(m);
    }
    return facts;
}

function divisors(facts) { // number of unique divisor pairs
    var num = 1;
    for (var fact of facts)
        num *= 1 + 2*fact;
    return (num+1)/2;
}

function range(n) { // range of consecutive primes producing more than n number of divisors
    var m = 1, i = 0;
    while ((m+1)/2 <= n) {
        m *= 3;
        i++;
    }
    return i;
}

function makePrimes(range) {
    var primes = [];
    for (var i=0; i<range; i++)
        primes.push(prime(i));
    return primes;
}

function Reciprocal(range) {
    this.range = range;
    this.facts = Array.apply(null,Array(range)).map(()=>1);
}

Reciprocal.prototype.number = function() {
    for (var n=1,i=0; i<this.range; i++) {
        n *= Math.pow(prime(i),this.facts[i]);
    }
    return n;
}

Reciprocal.prototype.reduce = function() {
    var pmax = prime(this.range-1);
    for (var m=2; m<pmax; m++) {
        var facts = factors(m),
            newFacts = this.facts.slice(0,-1);
        for (var i=0; i<facts.length; i++) {
            newFacts[i] += facts[i];
        }
        if (divisors(newFacts) > max) {
            this.range--;
            this.facts = newFacts;
            return true;
        }
    }
    return false;
}

// Main:
var max = 4e6,
    x = new Reciprocal(range(max));
console.log(x);
while (x.reduce()) {}
console.log(x, x.number()); // 9350130049860600

