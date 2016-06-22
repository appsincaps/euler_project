var fs = require('fs'),
    source = 'p079_keylog.txt',
    data = fs.readFileSync(source, "utf8").trim().split('\n'); //.map(n=>n.split('').map(Number));

console.log(data.length);
data = data.filter((v,i)=>data.indexOf(v,i+1)<0);
console.log(data.length);
data.sort();
console.log(data);

