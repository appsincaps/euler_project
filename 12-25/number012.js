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

function triNumber(divs) {
  var prime = primeGen(),
      dividers = function(n1,n2) {
        var p, numDiv = 1;
        prime.reset();
        while (n1 > 1 || n2 > 1) {
          var count = 1;
          p = prime.next();
          while (n1%p===0) {n1 /= p; count++;}
          while (n2%p===0) {n2 /= p; count++;}
          numDiv *= count;
        }
        return numDiv;
      };
  
  var num = divs*2;
  do {
      num += 1;
      var a = num%2 ? [num,(num+1)/2] : [num/2,num+1];
      var d = dividers(a[0],a[1]);
  } while (d <= divs);
  
  return a[0]*a[1];
  
}

console.log(triNumber(500));