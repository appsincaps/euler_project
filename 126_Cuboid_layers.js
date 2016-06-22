// first: 'slow' solution:
/*
function area(x,y,z) { // cuboid surface area
    return 2*(x*y + x*z + y*z);
}

function perimeter(x,y,z) { // cuboid perimeter
    return 4*(x + y + z);
}

function cubes(layer,x,y,z) { // number of cubes in a layer
    if (layer === 0) return area(x,y,z);
    return area(x,y,z) + layer*perimeter(x,y,z) + layer*(layer-1)*4;
}

function solve(x,y,z,t) { // min number of layers for count t
    var p = x+y+z,
        d = Math.pow(p-1,2) - 2*(x*y+x*z+y*z) + t;
    if (d <= 0) return 0;
    var v = (Math.sqrt(d)-p+1)/2;
    return v>0 ? v : 0;
}

//console.log(cubes(3,3,2,1)); // 118

var c = [], high = 1.6e4, low = high - 1e2,
    maxSize = (high-2)/4;
for (var x=1; x<=maxSize; x++) {
    for (var y=1; y<=x; y++) {
        for (var z=1; z<=y; z++) {
            var min = Math.ceil(solve(x,y,z,low));
            for (var n=min;; n++) {
                var num = cubes(n,x,y,z);
                if (num > high) break;
                c[num] = (c[num]||0) + 1;
            }
        }
    }
}
*/ 
// This works ok for small counts (up to ~100) but then gets very slow
// second - faster solution:

function areas(p,h) { // produce array of cuboid areas less than h for given perimeter/4
    var arr = [];
    for (var x=1; x<=p/3; x++) {
        for (var y=x; y<=(p-x)/2; y++) {
            var z = p-x-y,
                a = 2*(x*y + x*z + y*z);
            if (a>h) break;
            arr[a] = (arr[a]||0) + 1;
        }
    }
    return arr;
}

function solveP(p,s,t) { // find min number of layers
    var d = Math.pow(p-1,2) - s + t;
    if (d <= 0) return 0;
    var v = (Math.sqrt(d)-p+1)/2;
    return v>0 ? v : 0;
}

function seek(a,target) {
    return a.indexOf(target);
}

var c = [], high = 2.5e4, low = 154,
    maxSize = (high-2)/4, maxP = maxSize+2;
for (var p=3; p<=maxP; p++) { // scan all possible perimeters
    var a = areas(p,high);
    for (var s in a) { // scan areas
        var mult = a[s]; // multiplicity
        var min = Math.ceil(solveP(p,+s,low));
        for (var n=min;; n++) { // add up layers
            var num = +s + 4*n*p + n*(n-1)*4;
            if (num > high) break;
            c[num] = (c[num]||0) + mult;
        }
    }
}

//console.log(c[22],c[46],c[78],c[118]); // 2 4 5 8
//for (var k in c) console.log(k,c[k]);
console.log(seek(c,1000)); // 18522