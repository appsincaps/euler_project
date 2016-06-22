var fs = require('fs'),
    source = 'p082_matrix.txt',
    data = fs.readFileSync(source, "utf8").trim().split('\n').map(n=>n.split(',').map(Number));

/*data = [[131,673,234,103,18],
        [201,96,342,965,150],
        [630,803,746,422,111],
        [537,699,497,121,956],
        [805,732,524,37,331]];*/

var height = data[0].length, width = data.length;
for (var col=1; col<width-1; col++) {
    var arr = [];
    for (var row=0; row<height; row++) {
        if (row === 0) arr[row] = data[row][col] + data[row][col-1];
        else arr[row] = data[row][col] + Math.min(data[row][col-1],arr[row-1]);
    }
    for (var row=height-2; row>=0; row--)
        arr[row] = Math.min(data[row][col]+arr[row+1],arr[row]);
    for (var row=0; row<height; row++)
        data[row][col] = arr[row];
}
for (var a=[],row=0; row<height; row++)
    a.push(data[row][width-2] + data[row][width-1]);
console.log(Math.min.apply(null,a)); // 260324