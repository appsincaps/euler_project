var fs = require('fs'),
    source = 'p083_matrix.txt',
    data = fs.readFileSync(source, "utf8").trim().split('\n').map(n=>n.split(',').map(Number));

/*data = [[131,673,234,103,18],
        [201,96,342,965,150],
        [630,803,746,422,111],
        [537,699,497,121,956],
        [805,732,524,37,331]];*/

var height = data.length, width = data[0].length;

// Data model for cells and supporting methods for a path search
function Cell(val,x,y) {
    this.val = val;
    this.x = x;
    this.y = y;
    this.before = null;
    this.after = null;
    this.sum = null;
    this.onPath = false;
}

/*Object.defineProperty(Cell.prototype, 'sum', 
    {get: function() {
        if (this.x + this.y === 0) return this.val;
        return this.before && this.before.sum? this.val + this.before.sum : null;
    }});*/ // bad idea - slows things down to a crawl

Cell.prototype.link = function(cell) {
    this.before = cell;
    this.sum = cell.sum + this.val;
    cell.after = this;
}

Cell.prototype.up = function(m) {
    return this.y>0 ? m[this.y-1][this.x] : null;
}

Cell.prototype.down = function(m) {
    return this.y<m.length-1 ? m[this.y+1][this.x] : null;
}

Cell.prototype.left = function(m) {
    return this.x>0 ? m[this.y][this.x-1] : null;
}

Cell.prototype.right = function(m) {
    return this.x<m[0].length ? m[this.y][this.x+1] : null;
}

// Path search functions:
function search(cells,n) {
    var updated = false;
    if (searchLeg(cells,n)) updated = true;
    if (searchLeg(cells,n,true)) updated = true;
    return updated;
}

function searchLeg(cells,n,down) {
    var updated = false;
    if (n<1) return;
    var tot=2*n+1, count=0,
        cell = down ? cells[0][n] : cells[n][0];
    while (cell) {
        if (update(cell,cells)) updated = true;
        if (down) {
            if (cell.y<n) cell = cell.down(cells);
            else cell = cell.left(cells);
        }
        else {
            if (cell.x<n) cell = cell.right(cells);
            else cell = cell.up(cells);
        }
    }
    return updated;
}

function update(cell,cells) {
    var min, link, updated = false,
        dir = ['up','right','down','left'];
    for (var i=0; i<4; i++) {
        var next = cell[dir[i]](cells);
        if (next && next.sum) {
            if (!min || next.sum<min) {
                min = next.sum;
                link = next;
                updated = true;
            }
        }
    }
    cell.link(link);
    return updated;
}

function findPath(cells) {
    var size = cells.length,
        cell = cells[size-1][size-1];
        while (cell) {
            cell.onPath = true;
            cell = cell.before;
        }
}

// helper functions: 

function indicate(cell1, cell2) { // signs for indicating links
    var x = cell1.x - cell2.x,
        y = cell1.y - cell2.y;
    if (!x && !y) return '';
    if (x) return x>0 ? '⇦' : '⇨';
    return y>0 ? '⇧' : '⇩';
}

/*function showPath(m) { // tools for vizualizing
    for (var i=0; i<m.length; i++) {
        var str = [];
        for (var j=0; j<m[i].length; j++) {
            var n = m[i][j].val;
            if (m[i][j].onPath) n = '<' + n + '>';
            else n = ' ' + n;
            str.push(n);
        }
        console.log(str.join('\t'));
    }
}*/

function showPath(m) { // tools for vizualizing
    for (var i=0; i<m.length; i++) {
        var str = [];
        for (var n,j=0; j<m[i].length; j++) {
            if (m[i][j].onPath) n = '*';
            else n = ' ';
            str.push(n);
        }
        console.log(str.join(' '));
    }
}

function show(m,f) {
    f = f || 'val';
    for (var i=0; i<m.length; i++) {
        var str = [];
        for (var j=0; j<m[i].length; j++) {
            var cell = m[i][j], n = cell[f];
            if (cell.before) {
                n = indicate(cell,cell.before) + n;
            }
            if (cell.after) {
                n = n + indicate(cell,cell.after);
            }
            str.push(n);
        }
        console.log(str.join('\t\t'));
    }
}

// Main part:

var cells = []
for (var i=0; i<height; i++) { // create cells from data
    var row = [];
    for (var j=0; j<width; j++) {
        var cell = new Cell(data[i][j],j,i);
        row.push(cell);
    }
    cells.push(row);
}
cells[0][0].sum = cells[0][0].val; // initialize from the origin

for (var i=1; i<height; i++) {
    search(cells,i);
    var j = i;
    while (--j>1 && search(cells,j)) {}
    if (++j<i)
        while (++j<=i)
            search(cells,j);
}

//findPath(cells);
//showPath(cells);
//console.log('');
console.log(cells[height-1][width-1].sum); // 425185
