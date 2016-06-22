function sumSubset(a,n) {
    if (n===1) return a;
    var arr = [], len = a.length-n+1;
    for (var i=0; i<len; i++) {
        var f = a[i],
            rest = sumSubset(a.slice(i+1),n-1).map(v=>v+f);
        arr = arr.concat(rest);
    }
    return arr;
}

function checkSet(a) {
    var sums = [a],
        max = 5;
    for (var i=2; i<=max; i++) {
        var sub = sumSubset(a,i);
        if (sub.some((v,i)=>sub.indexOf(v,i+1)>-1))
            return i + '+'; // check subset inner uniqueness
        if (Math.max.apply(null,sums[i-2]) >= Math.min.apply(null,sub))
            return i + '-'; // check bigger subsets are larger
        sums[i-1] = sub;
    }
    return 'ok';
}

function string(a) {
    return a.join('');
}

console.log(checkSet([20,31,38,39,40,42,45]));
console.log(string([20,31,38,39,40,42,45]));