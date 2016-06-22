function isPrime(n) { // checks if n is prime
    if (n===2 || n===3) return true;
    if (n<2 || n%2===0 || n%3===0) return false;
    var m=Math.ceil(Math.sqrt(n));
    for (var i=5; i<=m; i+=6) 
      if (n%i===0 || n%(i+2)===0) return false;
    return true;
}

function append(x,a) { // append character x in front of each element in a
    for (var i=0; i<a.length; i++) 
        a[i] = x + a[i];
    return a;
}

function stringPerms(a) { // creates recursively an array of permutations
    if (a.length === 1) return a;
    for (var arr=[],i=0; i<a.length; i++) {
        var temp = a.slice();
        temp.splice(i,1);
        arr = arr.concat(append(a[i],stringPerms(temp)));
    }
    return arr;
}

function permutations(x) { // produce permutations of x larger than x, remove duplicates
    var digits = x.toString().split(''),
        arr = stringPerms(digits);
    return arr.map(Number).filter(v=>v>x).filter((v,i,a)=>a.lastIndexOf(v)===i);
}

var res = [];
for (var n=1000; n<10000; n++) {
    if (!isPrime(n)) continue;
    var perms = permutations(n);
    for (var p of perms)
        if (isPrime(p)) {
            var k = 2*p-n;
            if (perms.indexOf(k)>-1 && isPrime(k))
                res.push([n,p,k]);
        }
}
console.log(res.map(v=>v.join(''))); // [ '148748178147', '296962999629' ]

