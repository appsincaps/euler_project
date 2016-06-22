// Data models (triangle w/3 points: (0,0), p1 and p2)
function Point(x,y) {
    this.x = x;
    this.y = y;
}

Point.prototype.subtract = function(p) {
    return new Point(this.x-p.x,this.y-p.y);
}

Point.prototype.square = function() {
    return this.x*this.x + this.y*this.y;
}

function Triangle(p1,p2) {
    this.p1 = p1;
    this.p2 = p2;
}

Triangle.prototype.isRight = function() {
    var sides = [this.p1.square(),this.p2.square(),
                this.p1.subtract(this.p2).square()];
    sides.sort((a,b)=>a-b);
    return sides[0]+sides[1] === sides[2]; // pythagoras
}

function* movingPoint(n,start) {
    for (var i=0; i<=n; i++)
        for (var j=0; j<=n; j++) {
            if (start) {
                i = start.y;
                j = start.x;
                start = null;
            }
            yield new Point(j,i);
        }
}

function* makeTriangle(n) {
    var lowPoints = movingPoint(n);
    lowPoints.next(); // make sure non-zero sides
    for (var p1 of lowPoints) {
        var highPoints = movingPoint(n,p1);
        highPoints.next(); // make sure non-zero-sides
        for (var p2 of highPoints)
            yield new Triangle(p1,p2);
    }
}

var triangles = makeTriangle(50),
    count = 0;
    
for (var t of triangles)
    if (t.isRight()) count += 1;

console.log(count); // 14234




