var fs = require('fs'),
    source = 'p089_roman.txt',
    data = fs.readFileSync(source, "utf8").trim().split('\n');

var sum=0,
    ones = ['I','X','C'],
    fives = ['V','L','D'];
    
data.forEach(function(n) {
    for (var i=0; i<3; i++) {
        var regex = new RegExp('(.)*('+ones[i]+'{4})'),
            m = n.match(regex);
        if (m) {
            if (m[1] && m[1]===fives[i]) sum +=3;
            else sum += 2;
        }
    }
});

console.log(sum); // 743