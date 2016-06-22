/*
Failed attempts (may still be useful for something later ?):

var limit = 1e6, memo = [], memo2 = [];

function f(n,p,m) { // return number of partitions for number with  given number of parts
    m = m || n-p+1;
    if (p > n || p === 0 || n > p*m) return 0;
    if (p === n) return 1;
    if (p === 1 && m>=n) return 1;
    if (memo[n] && memo[n][p] && memo[n][p][m]) return memo[n][p][m];
    for (var s=0, i=m; i>0; i--) {
        var a = n-i, b = p-1, c = i;
        if (b > a || b === 0 || a > b*c) continue;
        if (a === b) {s++; continue;}
        if (b===1 && c>=a) {s++; continue;}
        if (memo[a] && memo[a][b] && memo[a][b][c]) s += memo[a][b][c];
        else s += f(a,b,c);
        if (s>limit) s = s%limit;
    }
    if (!memo[n]) memo[n] = [];
    if (!memo[n][p]) memo[n][p] = [];
    memo[n][p][m] = s;
    return s;
}

function ff(n,p,m) { // same used to return partitions for debugging
    m = m || n-p+1;
    if (p > n || p === 0 || n > p*m) return null;
    if (p === n) return [Array.apply(null,Array(n)).map(_=>1)];
    if (p === 1 && m>=n) return [[n]];
    for (var s=[], i=m; i>0; i--) {
        var a = ff(n-i,p-1,i);
        if (a) s = s.concat(a.map(v=>[i].concat(v)));
    }
    return s;
}

function partitions(num) { // sum partitions ordered by number of parts
    for (var s=0,i=1; i<=num; i++) {
        s += f(num,i);
        if (s>limit) s = s%limit;
        //console.log(ff(num,i));
    }
    return s;
}

/*
function parts(amount,max) { // number of partitions for given amount
    if (!max) max = amount;
    if (memo2[amount] && memo2[amount][max]) 
        return memo2[amount][max];
    if (amount === 0 || max === 1) return 1;  // only one combination
    
    for (var s=0,i=0; i*max<=amount; i++) {
        var x=amount-i*max, y=max-1;
        if (y > x) y = x;
        if (!memo2[x]) memo2[x] = [];
        if (!memo2[x][y]) memo2[x][y] = parts(x,y);
        s += memo2[x][y];
        if (s>limit) s = s%limit;
    }
    if (!memo2[amount]) memo2[amount] = [];
    memo2[amount][max] = s;
    return s;
}

for (var n=1000; n<50000; n++) {
    var p = parts(n);
    if (n%1000===0) console.log(n,p);
    if (p===0) break;
}
*/

var pents = function() { // generalized pentagonal numbers
    
    var count=1, arr = [0,1,2], obj = {};
    var add = function() {
        var i = ~~(arr.length/2) + 1;
        arr.push(i*(3*i-1)/2);
        arr.push(i*(3*i+1)/2);
    };
    obj.reset = function() {count=1;};
    obj.next = function() {while (count >= arr.length) add(); return arr[count++];};
    obj.at = function(n) {while (n >= arr.length) add(); return arr[n];};
    obj.get = function() {return arr;};
    return obj;
}();

// main part:

var limit = 1e6, 
    parts = [1,1]; // array of p(n), where n is index
    
for (var i=2,p=1; p>0; i++) { // populate array up to the number that is divisible by limit
    for (var p=0,j=1;; j++) {
        var n = pents.at(j); // pick a pentagonal number
        if (n>i) break;
        var sign = 1 - 2*(~~((j-1)/2) % 2);
        p += sign * parts[i-n]; // use Euler's formula for p(n)
        if (p<0) p += limit; // make sure p is positive
        if (p>limit) p = p%limit; // limit calculations to the last few digits smaller than limit
    }
    parts[i] = p; // push result to the memory for later use
}

console.log(i-1); // 55374
