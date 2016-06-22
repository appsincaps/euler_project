function squareSum(n) {
    return n.toString().split('').reduce((s,v)=>s+(+v)*(+v),0);
}

var memo = [], count = 0;
for (var i=1; i<1e7; i++) {
    var num = i, hist = [], state = 0;
    while (!state) {
        if (memo[num]) {
            if (memo[num] === 89) state = 89;
            else state = 1;
        } else if 
            (num===1 || num===89) state = num;
        hist.push(num);
        num = squareSum(num);
    }
    for (var n of hist) memo[n] = state;
    if (state === 89) count++;
}
console.log(count); // 8581146
