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

function totient(n) {
    var p, count=0, tot = n;
    while (n > 1) {
        p = prime(count++);
        if (n%p === 0) {
            tot *= 1-1/p;
            while (n%p===0) n /= p;
        }
    }
    return Math.round(tot);
}

//for (var sum=0,n=2; n<=1000000; n++) 
    //sum += totient(n);
//console.log(sum); // 303963552391

// 2nd solution


var arr=[], max=1000000;

for (var i=2; i<=max; i++) {
  if (!arr[i]) {
    for (var j=i; j<=max; j+=i) {
      arr[j] = arr[j]||j;
      arr[j] -= arr[j]/i;
    }
  }
}
console.log(arr.reduce((a,b)=>a+b)); // 303963552391


