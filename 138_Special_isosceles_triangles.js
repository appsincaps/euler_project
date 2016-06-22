function solution(d,p,q,n) { // solution generator for Pell's equation
    var a = Math.pow(p+q*Math.sqrt(d),n),
        b = Math.pow(p-q*Math.sqrt(d),n),
        x = Math.round((a+b)/2),
        y = Math.round((a-b)/2/Math.sqrt(d));
    return [x,y];
}

function leg(m,y) { // calculates length of a leg in an isoceles triangle
    var x = 2*y+m;
    return x*x + y*y;
}

var s = 0;
for (var n=1; n<=12; n++) {
    var sol = solution(5,2,1,n), // minimal solution pair: (p,q)=(2,1)
        l = leg(sol[0],sol[1]);
    //console.log(sol,l);
    s += l;
}
console.log(s); // 1118049290473932