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

var arr = [];
for (var i=1; arr.length<40; i++) {
    var n = prime(i);
    if (n%5 === 0) continue;
    var x = divideBy(n);
    if (1e9%x === 0) arr.push(n);
}
console.log(arr.reduce((a,b)=>a+b)); // 843296