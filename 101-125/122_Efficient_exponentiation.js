function empty(arr) {for (var i=0; i in arr; i++) {} return i;} // first empty index
// multiplication steps == unit summation steps
var m = [0,0], a = [[1]]; // seed
for (var n=0; empty(m)<=200; n++) { // take n steps until m array is filled up to 200-th index
    var len = a.length,
        aa = [];
    for (var i=0; i<len; i++) {
        var s = a[i], x = s[s.length-1],
            sx = s.map(v=>v+x).filter(v=>!m[v] || n+1<=m[v]); // filter out less efficient steps (greedy)
        sx.forEach(v=>m[v]=m[v]||(n+1));
        for (var z of sx) aa.push(s.concat(z));
    }
    a = aa;
}
for (var s=0,n=1; n<=200; n++) s += m[n]; 
console.log(s); // 1582