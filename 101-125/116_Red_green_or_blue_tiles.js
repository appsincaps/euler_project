var count = function() {
    var memo = [];
    function f(m,n) {
        if (n < 0) n = 0;
        if (!memo[m]) memo[m] = [];
        if (memo[m][n]) return memo[m][n];
        for (var sum=1,i=0; i<=n-m; i++)
            sum += f(m,n-i-m);
        memo[m][n] = sum;
        return sum;
    }
    return f;
}();

function count3(n) {
    var a = count(2,n)-1, b = count(3,n)-1, c = count(4,n)-1;
    return a+b+c;
}

console.log(count3(50)); // 20492570929