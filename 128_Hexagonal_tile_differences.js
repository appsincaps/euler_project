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

function firstTile(n) { // top tile number in layer n
    return 2 + 3*n*(n-1);
}

function lastTile(n) { // last tile number in layer n
    return firstTile(n+1) - 1;
}

var tiles = [1,2], max = 2000; // first two tiles done manually 1 and 2
for (var count=2,n=2;; n++) { // skip layer 1, where 7 is exception
    // check first:
    var a = 6*n+1, b = 6*n - 1, c = 12*n+5;
    if (checkPrime(a) && checkPrime(b) && checkPrime(c)) {
        count++; tiles.push(firstTile(n));
    }
    if (count >= max) break;
    // check last:
    a = a+4, c = c-12;
    if (checkPrime(a) && checkPrime(b) && checkPrime(c)) {
        count++; tiles.push(lastTile(n));
    }
    if (count >= max) break;
}

console.log(tiles[max-1]); // 14516824220