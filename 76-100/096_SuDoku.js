// Load data from a file:
var fs = require('fs'),
    source = 'p096_sudoku.txt',
    data = fs.readFileSync(source, "utf8").trim().split('\n');
    
var examples = [];
for (var i=0; i<50; i++) {
    var example = [];
    for (var j=1; j<10; j++)
        example.push(data[i*10+j].split('').map(Number));
    examples.push(example);
}

// Set up the model for sodoku tables and cells:
function Cell(table,row,col,val) { // used in a sudoku cell table
    this.table = table;
    this.row = row;
    this.col = col;
    this.val = val || [1,2,3,4,5,6,7,8,9]; // possible choices of val as array
}

Cell.prototype.display = function() { // for visualization
    var disp = '';
    if (this.val.length === 1) 
        disp += ' '+this.val[0]+' ';
    else disp += '|'+this.val.length+'|';
    return disp;
}

Cell.prototype.set = function(num) { // puts a cell into a queue after setting val
    if (num<1 || num>9) return false;
    this.val = [num];
    this.table.queue.push(this);
}

Cell.prototype.reduce = function(num) { // for removing num from val array
    var i = this.val.indexOf(num);
    if (i > -1) { 
        this.val.splice(i,1);
        if (this.val.length === 0)
            this.table.state = -1;
        if (this.val.length === 1) 
            this.table.queue.push(this);
    }
}

function Sudoku() { // for maintaining a sudoku table
    var n = 9, table = [];
    for (var i=0; i<n; i++) {
        var row = [];
        for (var j=0; j<n; j++)
            row.push(new Cell(this,i,j));
        table.push(row);
    }
    this.size = n;
    this.data = table;
    this.queue = [];
    this.state = 0;
} 

Sudoku.prototype.show = function() { // for visualization
    var display = '';
    for (var i=0; i<this.size; i++) {
        for (var j=0; j<this.size; j++) 
            display += this.data[i][j].display();
        display += '\n';
    }
    console.log(display);
}

Sudoku.prototype.load = function(data) { // sets cells with data from examples
    if (data.length !== this.size || 
        data[0].length !== this.size) 
            return false;
    for (var i=0; i<this.size; i++)
        for (var j=0; j<this.size; j++)
            if (data[i][j] > 0) 
                this.data[i][j].set(data[i][j]);
}

Sudoku.prototype.updateRow = function(row,col,num) { // rmoves num from a matching row
    for (var i=0; i<this.size; i++)
        if (i !== col) this.data[row][i].reduce(num);
}

Sudoku.prototype.updateCol = function(row,col,num) { // removes num from a matching collumn
    for (var i=0; i<this.size; i++)
        if (i !== row) this.data[i][col].reduce(num);
}

Sudoku.prototype.updateBox = function(row,col,num) { // box is 1/3 square area
    var n = this.size/3,
        ii = ~~(row/n), jj = ~~(col/n);
    for (var i=0; i<n; i++)
        for (var j=0; j<n; j++) {
        var iii = i+ii*n, jjj = j+jj*n;
        if (iii !== row && jjj !== col) 
            this.data[iii][jjj].reduce(num);
        }
}

Sudoku.prototype.update = function(row,col,num) { // removes num from cells in matching rows, columns and boxes
    this.updateRow(row,col,num);
    this.updateCol(row,col,num);
    this.updateBox(row,col,num);
}

Sudoku.prototype.first = function() { // returns first cell with multiple choices
    for (var row of this.data)
        for (var cell of row)
            if (cell.val.length > 1) 
                return cell;
}

Sudoku.prototype.dequeue = function() { // updates all cells around queued cells
    while (this.queue.length > 0) {
        var cell = this.queue.shift();
        if (cell.val.length === 1)
            this.update(cell.row,cell.col,cell.val[0]);
    }
}

Sudoku.prototype.copy = function() { // for producing a duplicate
    var sudoku = new Sudoku(),
        table = [];
    for (var i=0; i<this.size; i++) {
        var row = [];
        for (var j=0; j<this.size; j++)
            row.push(new Cell(sudoku,i,j,this.data[i][j].val.slice()));
        table.push(row);
    }
    sudoku.data = table;
    return sudoku;
}

Sudoku.prototype.write = function(sudoku) { // for copying one into another
    for (var key in this)
        this[key] = sudoku[key];
}

Sudoku.prototype.solve = function() { // recursive loop for try and error solution (whatever first found)
    this.dequeue();
    while (this.state === 0) {
        var cell = this.first();
        if (!cell) this.state = 1;
        else {
            for (var n of cell.val) {
                var copy = this.copy();
                copy.data[cell.row][cell.col].set(n);
                if (copy.solve()) break;
            }
            if (copy.state === 1) this.write(copy);
            else this.state = -1;
        }
    }
    return this.state > 0;
}

Sudoku.prototype.sum = function() { // top left 3-digit number
    return +('' + this.data[0][0].val[0] + this.data[0][1].val[0] + this.data[0][2].val[0]);
}

// Main loop over all examples:
for (var sum=0,i=0; i<50; i++) {
    var x = new Sudoku();
    x.load(examples[i]);
    x.solve();
    sum += x.sum();
}

console.log(sum); // 24702
