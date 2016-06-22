var count = function() {
    var memo = [];
    function f(n,min,m) {
        if (n < 0) n = 0;
        m = m || n;
        if (m > n) m = n;
        if (!memo[n]) memo[n] = [];
        if (memo[n][m]) return memo[n][m];
        for (var sum=1,k=m; k>=min; k--)
            for (var i=0; i<=n-k; i++)
                sum += f(i-1,min,k-1)*f(n-i-k-1,min,k);
        memo[n][m] = sum;
        return sum;
    }
    return f;
}();

for (var n=50; count(n,50)<1e6; n++) {}
console.log(n); // 168