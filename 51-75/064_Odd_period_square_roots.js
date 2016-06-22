function rootOneOver(num) { // root(num) = whole + remainder, 1/remainder = whole + remainder ...
    var a=Math.floor(Math.sqrt(num)), // whole = a
        k=1, l=a, m=1, arr=[a], // remainder = (k*root-l)/m,
        result = {root: num, answer:'['+a+';]', period: 0},
        memo = []; // to keep track of repeating patterns
    if (a*a === num) return result;
    var label = [a,k,l,m].join();
        memo.push(label);
    for (var i=1,j=-1; j<0; i++) { // loop over for the remainder
        a = Math.floor(m/(k*Math.sqrt(num)-l));
        var temp = k*k*num - l*l;
        k = m*k;
        l = a*temp-m*l;
        m = temp;
        var n = gcd(gcd(m,k),gcd(m,l)); // find common divider
        k = k/n;
        l = l/n;
        m = m/n;
        label = [a,k,l,m].join();
        j = memo.indexOf(label),
        memo.push(label);
        arr.push(a);
    }
    result.answer = '['+arr.slice(0,j).join()+';('+arr.slice(j,-1).join()+')]';
    result.period = i-j-1;
    return result; // an overkill - but makes it easier to debug
}
function gcd(x,y) { // greatest common divisor
    return y%x ? gcd(y%x,x) : x; 
}

for (var count=0,n=1; n<=10000; n++)
    if (rootOneOver(n).period%2) count++;
console.log(count); // 1322
