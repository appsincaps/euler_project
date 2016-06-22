function divideBy(n) {
    var repunits = 1,
        count = 1,
        step = ()=>(repunits = repunits*10 + 1,count++),
        divide = ()=>repunits = repunits%n;

    while (repunits < n) step();
    divide();
    while (repunits > 0) {
        for (step(); repunits<n; step()) {}
        divide();
    }
    return count;
}

for (var i=1e6+1; i<1.5e6; i+=2) {
    if (i%5 === 0) continue;
    var x = divideBy(i);
    if (x>1e6) break;
}
console.log(i,x); // 1000023 1000020