function solution(d,p,q,n) { // solution generator for Pell's equation
    var a = Math.pow(p+q*Math.sqrt(d),n),
        b = Math.pow(p-q*Math.sqrt(d),n),
        x = Math.round((a+b)/2),
        y = Math.round((a-b)/2/Math.sqrt(d));
    return [x,y];
}

var max = 1e8, count = 0;
for (var i=1;; i++) {
    var sol = solution(2,1,1,2*i+1),
        m = sol[0], n = sol[1];
    if (m+n >= max) break;
    count += Math.ceil(max/(m+n)-1);
}
console.log(count); // 10057761