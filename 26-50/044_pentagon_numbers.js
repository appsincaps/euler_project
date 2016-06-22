var pNumbers = [];
function pentMemo(x) { // pentagon number x
    if (!pNumbers[x]) pNumbers[x] = x*(3*x-1)/2;
    return pNumbers[x];
}

function pent(x) { // pentagon number x
    return x*(3*x-1)/2;
}

function sum(x,y) { // sum of pentagon numbers
    return pent(x) + pent(x+y);
}

function dif(x,y) { // difference of pentagon numbers
    return pent(x+y) - pent(x);
}
function root(x) { // checks if x is pentagon
    return (Math.sqrt(24*x+1)+1)/6 % 1 === 0;
}

/* // Old approach - very slow
var i=1, j=1, // indices
    js=[1,0], // current max j for each i
    ds=[], // current max d for each i
    d=dif(i,j); // current difference for current (i,j)
    
function next(f) { // find (i,j) for next smallest f(i,j)
    var td, temp;
    for (var k=0; k<js.length; k++) {
        if (!ds[k]) ds[k] = f(k+1,js[k]+1);
        var ttd = ds[k];
        if (ttd === d) {
            td = ttd;
            temp = [k+1,js[k]+1];
            break;
        }
        if (!td || ttd<=td) {
            td = ttd;
            temp = [k+1,js[k]+1];
        }
    }
    d = td;
    i = temp[0];
    j = temp[1];
    js[i-1]++;
    ds[i-1] = f(i,j+1);
    if (i === js.length) js.push(0);
}
*/
var done, z = 1;
do {
    var pz = pent(++z);
    for (var j=1; j<z; j++) {
        if ((2*pz)%j > 0) continue;
        var i = (2*pz/j-3*j+1)/6; // from formula for p(i+j)-p(i)
        if (i%1 > 0) continue;
        done = root(sum(i,j));
        if (done) break;
    }
} while (!done)

console.log(pz); // 5482660
