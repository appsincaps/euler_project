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

function divisible(n) {
    var a = divideBy(n);
    return (n-1)%a === 0;
}

var arr = [];
for (var i=3; i<1e5; i+=2) {
    if (i%5 === 0) continue;
    if (!checkPrime(i) && divisible(i)) arr.push(i);
    if (arr.length >= 25) break;
}

console.log(arr.reduce((a,b)=>a+b)); // 149253