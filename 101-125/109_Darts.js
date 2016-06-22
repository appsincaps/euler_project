var singles = [], doubles = [], trebles = [];

for (var i=1; i<=20; i++) {
    singles.push(i); doubles.push(2*i); trebles.push(3*i);
}

singles.push(25); doubles.push(50);
singles = singles.reverse();
doubles = doubles.reverse();
trebles = trebles.reverse();

var s = singles.map(v=>[1,v]),
    d = doubles.map(v=>[2,v]),
    t = trebles.map(v=>[3,v]),
    combined = s.concat(d,t).sort((a,b)=>b[1]-a[1]);

function countWays(score) { // main counter (ignores singles assuming a large score)
    var count = 0;
    for (var double of doubles) {
        var scr = score - double;
        if (scr > 120) break;
        for (var sec of combined) {
            if (sec[1] === scr) count++;
            var rest = scr - sec[1];
            if (rest <= 0) continue;
            if (rest > 60) break;
            for (var thrd of combined) {
                if (thrd[1] === rest) {
                    if (thrd[1] === sec[1] && thrd[0] === sec[0]) count++;
                    else count += 0.5; // nonidentical pairs are repeated twice
                }
            }
        }
    }
    return count;
}

for (var sum=0, i=100; i<=170; i++)
    sum += countWays(i);
    
console.log(42336 - sum); // 38182

