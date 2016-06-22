function scan(max) {
    var arr = [], limit = Math.pow(max,1.0/3.0);
    for (var a=2; a<limit; a++) {
        for (var b=1; b<a; b++) {
            for (var c=1;; c++) {
                var n = (Math.pow(a,3)*c+b)*b*c;
                    if (n > max) break;
                    if (Math.sqrt(n) % 1 === 0)
                        if (arr.indexOf(n)<0) arr.push(n);
            }
        }
    }
    return arr;
}

var ps = scan(1e12);
//console.log(ps);
console.log(ps.reduce((x,y)=>x+y,0)); // 878454337159
