function gcd(x,y) {
    return x%y===0?y:gcd(y,x%y);
}

function triples(range) {
    var arr = [];
    for (var m=2; m<range; m++)
        for (var n=1; n<m; n++)
            if (gcd(m,n)===1) arr.push([m*m-n*n,2*m*n,m*m+n*n]);
    return arr;
}

var pt = triples(1e1),
    abs = highCount(pt);
    
function highCount(arr) {
    var counts = [];
    for (var a of arr) {
        if (!counts[a[0]]) counts[a[0]] = [];
        if (!counts[a[1]]) counts[a[1]] = [];
        if (counts[a[0]].indexOf(a[1])<0) counts[a[0]].push(a[1]);
        if (counts[a[1]].indexOf(a[0])<0) counts[a[1]].push(a[0]);
    }
    var highCounts = [];
    for (var i in counts) 
        if (counts[i].length>1) {
            highCounts[i] = counts[i];
            highCounts[i].sort((a,b)=>a-b);
        }
    return highCounts;
}

function print(a) {
    for (var i in a) console.log(i,'--',JSON.stringify(a[i]));
}


function newCounts(size) {
    var arr = [], range = Math.sqrt(size);
    for (var m=2; m<range; m++)
        for (var n=1; n<m; n++)
            if (gcd(m,n)===1) {
                var a = m*m-n*n, b = 2*m*n,
                    c = m*m+n*n;
                for (var k=1; c*k<size; k++) {
                    var ka = k*a, kb = k*b;
                    if (!arr[ka]) arr[ka] = [];
                    if (!arr[kb]) arr[kb] = [];
                    if (arr[ka].indexOf(kb)<0) arr[ka].push(kb);
                    if (arr[kb].indexOf(ka)<0) arr[kb].push(ka);
                }
            }
    var counts = [];
    for (var i in arr) 
        if (arr[i].length>1) {
            counts[i] = arr[i];
            counts[i].sort((a,b)=>a-b);
        }
    return counts;
}

function find(trips) {
    var arr = [];
    for (var b in trips) {
        b = +b;
        var bs = trips[b];
        //console.log(b,bs);
        for (var i=0; i<bs.length; i++) {
            var f = bs[i];
            if (f>b) break;
            //console.log('  f=',f);
            var fs = trips[f];
            //console.log('  fs=',JSON.stringify(fs));
            if (!fs) continue;
            for (var j=i+1; j<bs.length; j++) {
                var e = bs[j];
                if (e>b) break;
                //console.log('    e=',e);
                var c = Math.sqrt(b*b+e*e);
                //console.log('    c=',c);
                if (fs.indexOf(c) > -1) {
                    arr.push([b,e,f,(3*f*f+3*b*b+3*e*e)/2]);
                    var b2 = b*b,
                        f2 = f*f,
                        e2 = e*e,
                        c2 = c*c,
                        d2 = b2 + f2,
                        a2 = f2 + c2,
                        x = (a2+b2)/2,
                        y = (c2+d2)/2,
                        z = (e2+f2)/2;
                    console.log(x,y,z,x+y+z);
                    console.log(Math.sqrt(x+y),Math.sqrt(x-y),Math.sqrt(x+z),Math.sqrt(x-z),Math.sqrt(z+y),Math.sqrt(y-z));
                }
            }
        }
    }
    return arr;
}

var a = newCounts(4e3);
//print(a);
console.log(find(a));