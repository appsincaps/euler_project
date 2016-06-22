function divSum(num) {
    var sum = 1,
        m = Math.round(Math.sqrt(num));
    if (m*m === num) sum += m;
    for (var i=2; i<m; i++) 
        if (num%i === 0) sum += i+num/i;
    return sum;
}

var seen=[], max=1e6, chainLength=0, maxChain=[];
for (var num=12490; num<max; num++) {
    var n = num;
    if (true) {
        var chain = [];
        while (chain.indexOf(n) < 0) {
            chain.push(n);
            n = divSum(n);
            if (n > max) {chain = []; break;} 
        }
        if (num === n && chain.length > chainLength) {
            maxChain = chain;
            chainLength = chain.length;
        }
    }
}
console.log(chainLength); // 28
console.log(maxChain[0]); // 14316
