// Load data from a file:
var fs = require('fs'),
    source = 'p107_network.txt',
    data = fs.readFileSync(source, "utf8").trim().split('\n')
    .map(v=>v.split(',').map(x=>x==='-'?null:Number(x)));

// Data model (for edges):
function Edge(n,x,y) {
    this.net = n;
    this.x = x;
    this.y = y;
    this.val = n[x][y];
}

Edge.prototype.null = function() { // make it disappear
    this.save = this.val;
    this.val = 0;
    this.net[this.x][this.y] = null;
    this.net[this.y][this.x] = null;
}

Edge.prototype.reset = function() { // make it reappear if needed
    if (!this.save) return;
    this.val = this.save;
    this.net[this.x][this.y] = this.val;
    this.net[this.y][this.x] = this.val;
}

function load(d) { // create edges array for a network
    var edges = [];
    for (var i=1; i<d.length; i++) {
        for (var j=0; j<i; j++) {
            if (d[i][j])
                edges.push(new Edge(d,i,j));
        }
    }
    edges.sort((a,b)=>b.val-a.val);
    return edges;
}

function linked(d,x,y) { // checks if two vertices (i,j) are connected
    var f = v=>d[v].reduce((s,x,i)=>x?s.concat(i):s,[]),
        links = f(x),
        list = [];
    while (links.length > 0) {
        if (links.indexOf(y) > -1) return true;
        var newLinks = [];
        for (var link of links)  {
            newLinks = newLinks.concat(f(link)
                    .filter(x=>list.indexOf(x)<0 && newLinks.indexOf(x)<0));
        }
        list = list.concat(links);
        links = newLinks;
    }
    return false;
}

// Main:
var edges = load(data),
    before = edges.reduce((s,v)=>s+v.val,0);
for (var edge of edges) {
    edge.null();
    if (!linked(data,edge.x,edge.y)) 
        edge.reset();
}
var after = edges.reduce((s,v)=>s+v.val,0);
console.log(before - after); // 259679