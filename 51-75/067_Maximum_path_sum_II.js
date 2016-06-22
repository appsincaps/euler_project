var fs = require('fs'),
    source = 'p067_triangle.txt',
    data = fs.readFileSync(source, "utf8").trim().split('\n')
            .map(s=>s.split(' ').map(Number));

function collapse(triangle) {
    var a = triangle.slice();
    for (var i=1; i<a.length; i++)
        for (var j=0; j<a[i].length; j++) 
            a[i][j] += Math.max(a[i-1][j-1]||0,a[i-1][j]||0);
    return Math.max.apply(null,a[i-1]);
}
console.log(collapse(data)); // 7273

