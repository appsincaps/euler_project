var fs = require('fs'),
    source = 'p081_matrix.txt',
    data = fs.readFileSync(source, "utf8").trim().split('\n').map(n=>n.split(',').map(Number));

for (var i=0; i<data.length; i++) {
    for (var j=0; j<data[i].length; j++) {
        if (!i && !j) continue;
        if (!i) data[i][j] += data[i][j-1];
        else if (!j) data[i][j] += data[i-1][j];
        else data[i][j] += Math.min(data[i][j-1],data[i-1][j]);
    }
}
console.log(data[data.length-1][data[0].length-1]); // 427337
