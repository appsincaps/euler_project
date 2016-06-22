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

function primed(n) { // p = (n+1)^3-(n)^3
    return 3*n*(n+1) + 1;
}

var count = 0;
for (var n=1,p=primed(n); p<1e6; p=primed(++n))
    if (checkPrime(p)) count++;

console.log(count); // 173