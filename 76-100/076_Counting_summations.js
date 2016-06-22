function sums(n,m) { // returns number of summations to get n with max number m
    if (m>n) return 0;
    if (m===n || m===1) return 1;
    if (m===2) return ~~(n/m);
    var s = 0;
    while (n>=m) {
        n -= m; 
        if (n===0) {s += 1; break;}
        var k = m-1;
        while (k>0) s += sums(n,k--);
    }
    return s;
}

function summations(num) { // sum all combinations ordered by max number in summation
    for (var s=0,i=1; i<num; i++) s += sums(num,i);
    return s;
}
console.log(summations(100)); // 190569291