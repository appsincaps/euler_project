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

function mult(a,b) { // array multiplier
  return a.concat(a.map(v=>v*b));
}

function top(x) { // used as opposite of Math.trunc
  return x>0 ? Math.ceil(x) : Math.floor(x);
}

function totient(n,x,y) {
    var p, num=0, count=0, tot = [1]; // use array for collecting multipliers
    while (n > 1) {
        p = prime(count++);
        if (n%p === 0) {
            num++;
            tot = mult(tot,-p); // put inverse multipliers in an array
            while (n%p===0) n /= p;
        }
    }
    var totX = tot.reduce((s,v)=>s+top(x/v),0), // use to add all multiplers
        totY = tot.reduce((s,v)=>s+top(y/v),0);
    return totY-totX;
}

for (var sum=0,n=2; n<=12000; n++)
    sum += totient(n,Math.floor(n/3)+1,Math.ceil(n/2));

console.log(sum); // 7295372

