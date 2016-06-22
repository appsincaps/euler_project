function isAbundant(num) {
    var sum = 1, m = Math.round(Math.sqrt(num));
    if (m*m === num) sum += m;
    else if (num%m === 0) sum += m+num/m;
    for (var i=2; i<m; i++) if (num%i === 0) sum += i+num/i;
    return num>2 && sum>num;
}
function isSum(num) {
    return a.some((_,i)=>a[num-i]);
}
var a = [], nsum = 0;
for (var i=1; i<28123; i++) {
    if (!isSum(i)) nsum += i;
    if (isAbundant(i)) a[i] = true;
}
console.log(nsum);