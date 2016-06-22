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

function isPrime(n) {
    var m = Math.sqrt(n);
    for (var i=0; prime(i)<m; i++) {
        if (n%prime(i) === 0) return false;
    }
    return true;
}

function check9(d) {
    var a = Array.apply(null,Array(9)).map(()=>d),
        arr = [];
    for (var i=0; i<10; i++) {
        var b = a.slice();
        b.splice(i,0,0);
        for (var j=i===0?1:0; j<10; j++) {
            if (j===d) continue;
            b[i] = j;
            var num = +b.join('');
            if (isPrime(num)) arr.push(num);
        }
    }
    return arr;
}

function check8(d) {
    var a = Array.apply(null,Array(8)).map(()=>d),
        arr = [];
    for (var i=0; i<9; i++) {
        for (var j=1; j<10; j++) {
            var b = a.slice();
            b.splice(i,0,0);
            b.splice(j,0,0);
            var start = i>0? 0:10;
            for (var n=start; n<100; n++) {
                var x = ~~(n/10), y = n%10;
                if (x === d || y === d) continue;
                b[i] = x; b[j] = y;
                var num = +b.join('');
                if (isPrime(num)) arr.push(num);
            }
        }
    }
    return arr;
}

function check0() {
    var a = Array.apply(null,Array(8)).map(()=>0),
        arr = [];
    for (var i=0; i<1; i++) {
        for (var j=9; j<10; j++) {
            var b = a.slice();
            b.splice(i,0,0);
            b.splice(j,0,0);
            var start = 11;
            for (var n=start; n<100; n++) {
                var x = ~~(n/10), y = n%10;
                if (x === 0 || y === 0) continue;
                b[i] = x; b[j] = y;
                var num = +b.join('');
                if (isPrime(num)) arr.push(num);
            }
        }
    }
    return arr;
}

/*
// First checked M(10,d) for all d's:

for (var s=[],n=1; n<10; n++)
    s.push(n+':'+check9(n).length);
console.log(s.join()); // 1:11,2:0,3:7,4:1,5:1,6:1,7:9,8:0,9:8
console.log(check8(2).length); // 39
console.log(check8(8).length); // 32
console.log(check0().length); // 8
*/

// Now add them up:
var sum = 0;
for (var n=0; n<10; n++) {
    if (n === 0) sum += check0().reduce((a,b)=>a+b);
    else if (n === 2 || n === 8) 
        sum += check8(n).reduce((a,b)=>a+b);
    else sum += check9(n).reduce((a,b)=>a+b);
}
console.log(sum); // 612407567715