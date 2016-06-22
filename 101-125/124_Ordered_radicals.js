function factors(n) { // return number of prime factors
    var facts = [], i = 2;
    while (n > 1) {
        var m = 0;
        while (n%i === 0) {
            m++;
            n /= i;
        }
        if (m > 0) facts.push([i,m]);
        i++;
    }
    return facts;
}

var E=[],m=[[],[1]]; //seed
for (var i=2; i<=1e5; i++) {
    var f= factors(i),
        rad = f.reduce((p,v)=>p*v[0],1);
    if (!m[rad]) m[rad] = [];
    m[rad].push(i);
}
m.forEach(v=>E=E.concat(v))
//console.log(E.join());
console.log(E[1e4-1]);  // 21417
