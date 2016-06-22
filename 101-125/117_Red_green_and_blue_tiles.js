var count = function() {
    var memo = [];
    function f(n,m) {
        var min = 2;
        if (n < 0) n = 0;
        m = m || 4;
        if (m > n) m = n;
        if (!memo[n]) memo[n] = [];
        if (memo[n][m]) return memo[n][m];
        for (var sum=1,k=m; k>=min; k--)
            for (var i=0; i<=n-k; i++)
                sum += f(i,k-1)*f(n-i-k,k);
        memo[n][m] = sum;
        return sum;
    }
    return f;
}();

console.log(count(50,4)); // 100808458960497