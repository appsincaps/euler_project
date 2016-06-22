var count = function() {
    var memo = [];
    function f(n,m) {
        if (n < 0) n = 0;
        m = m || n;
        if (m > n) m = n;
        if (!memo[n]) memo[n] = [];
        if (memo[n][m]) return memo[n][m];
        for (var sum=1,k=m; k>=3; k--)
            for (var i=0; i<=n-k; i++)
                sum += f(i-1,k-1)*f(n-i-k-1,k);
        memo[n][m] = sum;
        return sum;
    }
    return f;
}();

console.log(count(50)); // 16475640049 
/*
Test section for debugging the above:
var countTest = function() {
    var memo = [], arr = [];
    function f(n,m) {
        if (n < 0) n = 0;
        m = m || n;
        if (m > n) m = n;
        if (!arr[n]) {
            memo[n] = [];
            arr[n] = [];
        }
        if (arr[n][m]) return arr[n][m];
        if (n === 0) return [[]];
        if (n === 1) return [[0]];
        if (n === 2) return [[0,0]];
        var s = [Array.apply(null,Array(n)).map(()=>0)];
        for (var k=m; k>=3; k--) {
            var t = Array.apply(null,Array(k)).map(()=>1);
            for (var i=0; i<=n-k; i++) {
                var abc = [], b = t.slice(),
                    a = f(i-1,k-1),
                    c = f(n-i-k-1,k); // <------ the ERROR was HERE: I had f(n-i-k-1)
                if (i>0) b = [0].concat(b);
                if (i<n-k) b = b.concat(0);
                for (var x of a) {
                    for (var y of c) {
                        abc = x.concat(b).concat(y);
                        s.push(abc);
                    }
                }
            }
        }
        arr[n][m] = s;
        return s;
    }
    return f;
}();

var res = countTest(9);
res = res.map(v=>v.map(x=>x>0?'X':'O').join(''));
res.forEach((x,i)=>{var j=res.indexOf(x,i+1); if (j>-1) console.log(i,j,x);});
console.log(res.map((v,i)=>i+'-'+v));
console.log(res.length);
*/