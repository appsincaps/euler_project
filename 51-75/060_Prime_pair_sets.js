function isPrime(n) { // checks if n is prime
    if (n===2 || n===3) return true;
    if (n<2 || n%2===0 || n%3===0) return false;
    var m=Math.ceil(Math.sqrt(n));
    for (var i=5; i<=m; i+=6) 
      if (n%i===0 || n%(i+2)===0) return false;
    return true;
}
/* 
Model: primes = [
                [[3],[5]], // single primes
                [[3,5],[5,7]] // prime pairs
                [[3,5,7],[5,7,11]] // prime triplets
                ];
*/

var primes = [[]];
for (var n=3; n<10000; n+=2) {
    if (!isPrime(n)) continue;
    var len = primes.length;
    for (var i=0; i<len; i++) {
        for (var j=0; j<primes[i].length; j++){
            var arr = combine([n].concat(primes[i][j]));
            if (!arr) continue;
            if (i===primes.length-1) primes.push([]);
            primes[i+1].push(arr);
        }
    }
    primes[0].push(n);
}

function combine(a) {
    var n = a[0], arr = a.slice(1);
    for (var m of arr)
        if (!primePair(n,m)) return false;
    return a;
}

function primePair(x,y) {
    if (isPrime(Number(''+x+y)) && isPrime(Number(''+y+x)))
        return true;
    else return false;
}

var five = primes[4];
if (five)
    for (var f of five)
        console.log(f,'=',f.reduce((a,b)=>a+b)); // [8389,6733,5701,5197,13]=26033
