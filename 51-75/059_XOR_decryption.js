var fs = require('fs'),
    source = 'p059_cipher.txt',
    data = fs.readFileSync(source, "utf8").trim().split(',').map(Number);

//Part I:

var keys = [[],[],[]];
for (var key=97; key<123; key++) {
    var stats = [{},{},{}],
        codes = [[],[],[]];
    for (var i=0; i<data.length; i+=3) {
        for (var j=0; j<3; j++) 
            codes[j].push(data[i+j]^key);
    }
    codes.forEach((code,i) =>
        code.forEach(v => {
            stats[i][v]=(stats[i][v]||0)+1;
            if (v<(stats[i].min||1000)) 
                stats[i].min = v;
            if (v>(stats[i].max||0)) 
                stats[i].max = v;
        })
    );
    stats.forEach((stat,i) => { // ASCII 32 (space) - frequent character
        if (stat.min === 32 && stat[stat.min] > 20)
            keys[i].push(String.fromCharCode(key));
    });
}

console.log(keys); // [ [ 'g' ], [ 'o' ], [ 'd' ] ]

//Part II:
var key = 'god';
console.log(data.map((v,i)=>v^key[i%3].charCodeAt()).reduce((a,b)=>a+b)); //107359
