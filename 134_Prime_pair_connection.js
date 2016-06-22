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

function exp(a,b,c) { // modular exponentiation (still too slow)
    var x = 1;
    a = a % c;
    while (b>0) {
        x = (x*a)%c;
        --b;
    }
    return x;
}

function connect(p1,p2) { // simple but slow
    var d = Math.pow(10,p1.toString().length);
    for (var n=1;;n++) {
        var x = n*d+p1;
        if (x%p2 === 0) return x;
    }
}

function connectX(p1,p2) { // faster? using modular algebra
    var d = Math.pow(10,p1.toString().length),
        n = ((p2-p1)*exp(d,p2-2,p2))%p2;
    return n*d + p1;
}

//console.log(connect(101,103),connectX(101,103));

var count15 = 0; // for counting million billions
for (var s=0,i=3,p1=5,p2=prime(i); p1<1e6; p2=prime(++i)) {
    s += connectX(p1,p2);
    p1 = p2;
    if (s>1e15) {s -= 1e15; count15++;}
    if (i%10000===0) console.log(p1,s);
}
console.log(count15,s); // 18 613426663617118