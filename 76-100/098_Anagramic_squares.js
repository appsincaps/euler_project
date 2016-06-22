// Load data from a file:
var fs = require('fs'),
    source = 'p098_words.txt',
    data = fs.readFileSync(source, "utf8").trim().split(',').map(v=>v.slice(1,-1));

var dict = {}, anagrams = [];

data.forEach(function(v) {
    var s = v.split('').sort().join('');
    dict[s] = (dict[s] || []).concat(v);
});

Object.keys(dict).forEach(function(k) {
    if (dict[k].length > 1) anagrams.push(dict[k]);
})
anagrams.sort((a,b)=>b[0].length-a[0].length);

function makeRules(words) {
    var word = words[0],
        rules = {};
    rules.length = word.length;
    rules.pairs = [];
    for (word of words) {
        var pair = word.split('').reduce(function(s,v,i,a) {
            var j = a.indexOf(v,i+1);
            if (j > -1) return [i,j]; // assuming there's only one pair!
            else return s;
        },null);
        if (pair) rules.pairs.push(pair);
    }
    rules.digits = rules.length - (rules.pairs.length?1:0);
    
    // tranform rules for each pair:
    
    rules.transform = [];
    for (var i=0; i<words.length-1; i++) {
        var a = words[i];
        for (var j=i+1; j<words.length; j++) {
            var b = words[j], t=[];
            b.split('').forEach(v=>t.push(a.indexOf(v)));
            rules.transform.push(t);
        }
    }
    
    return rules;
}

function countDigits(n) {
    var counts = {};
    n.toString().split('').forEach(s=>counts[s]=1);
    return Object.keys(counts).length;
}

function transform(n,t) {
    n = n.toString().split('');
    t = t.map(i=>n[i]);
    return +t.join('');
}

var squares = {};
for (var i=0, k=anagrams.length; i<k; i++) {
    var rule = makeRules(anagrams[i]),
        sq = [], len = rule.length,
        max = Math.ceil(Math.pow(10,len/2))-1,
        min = Math.ceil(Math.pow(10,(len-1)/2));
    if (squares[len]) sq = squares[len];
    else {
        for (var n=max; n>=min; n--)
            sq.push(n*n);
        squares[len] = sq;
    }
    sq = sq.slice().filter(n=>countDigits(n)===rule.digits);
    
    var m = sq.length,
        ts = rule.transform,
        done = false;

    for (var n=0; !done && n<m; n++) {
        for (var t of ts) {
            var num = sq[n],
                x = transform(num,t);
            if (sq.indexOf(x) > -1) {
                done = [num,x];
                break;
            }
        }
    }
    if (done) break;
}

console.log(done); // [ 17689, 18769 ]


