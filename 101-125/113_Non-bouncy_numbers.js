function bouncy(n) {
    n = n.toString();
    var m = n.split('').map(Number).sort((a,b)=>b-a),
        k = m.slice().reverse();
    m = m.join('');
    k = k.join('');
    if (n === m || n === k) return false;
    else return true;
}

function comb(n,k) {
    k = Math.min(k,n-k);
    for (var a=1,b=1,i=0; i<k; i++) {
        a *= n-i; b *= i+1;
    }
    return a/b;
}

function nonBouncy(k) {
    return comb(10+k,k) + comb(9+k,k) - 10*k - 1;
}

console.log(nonBouncy(100)-1); // 51161058134250 (-1 to exclude 0)