var primes = [2,3,5];

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
  
function prime(num) {
    while (num >= primes.length) nextPrime();
    return primes[num];
}

function checkPrime(n) {
    if (primes[primes.length-1] >= n)
        return primes.indexOf(n) > -1;
    var m=Math.ceil(Math.sqrt(n));
    for (var i=0, p=prime(i); p<=m; p=prime(++i))
         if (n%p === 0) return false;
    return true;
}

function divideBy(n) {
    var repunits = 1,
        count = 1,
        step = ()=>(repunits = repunits*10 + 1,count++),
        divide = ()=>repunits = repunits%n;

    while (repunits < n) step();
    divide();
    while (repunits > 0) {
        for (step(); repunits<n; step()) {}
        divide();
    }
    return count;
}

function rightFactors(n) { // checks if there are factors others than 2 and 5
    var facts = [2,5], i = 2;
    while (n > 1) {
        if (n%i === 0 && facts.indexOf(i) < 0) return false;
        while (n%i === 0) n /= i;
        i++;
    }
    return true;
}

// 10^n is divisible by x if x factors are only 2's or 5's
var sum = 2;
for (var i=1, p=prime(i); p<1e5; p=prime(++i)) {
    if (p%5 === 0 || !rightFactors(divideBy(p))) sum += p;
}
console.log(sum); // 453647705 