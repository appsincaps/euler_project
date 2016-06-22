var a=3, b=7, f=0, res=[];
for (var n,d=1000000; d>999990; d--) {
    n = a*d/b;
    if (n%1===0) n--;
    else n = ~~n;
    if (n/d>f) {f=n/d;res=[n,d]}
}
console.log(res); // [ 428570, 999997 ]