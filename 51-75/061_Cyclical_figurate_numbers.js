// Part I: generate figure nummbers

function numberFunction(p) {
    return [(x) => x*(x+1)/2,
            (x) => x*x,
            (x) => x*(3*x-1)/2,
            (x) => x*(2*x-1),
            (x) => x*(5*x-3)/2,
            (x) => x*(3*x-2)][p-3];
}
var numbers = [],
    limits = [[45,141],[32,100],[26,82],[23,71],[21,64],[19,59]];// try & error
for (var p=3; p<=8; p++) { // populate with figure numbers
    var f = numberFunction(p),
        arr = [];
    for (var i=limits[p-3][0]; i<limits[p-3][1]; i++)
        arr.push(f(i));
    numbers.push(arr);
}

// Part II: convert figure numbers to objects (same p,i indices)
// and link to number objects starting with two last digits of the original

function Figure(order,number,links) { // object constructor
    this.order = order;
    this.number = number;
    this.links = links || [];
}
function findLinksFor(order,number) { // loops through all numbers looking for matches
    var links = [];
    for (var p=0; p<numbers.length; p++) {
        if (p===order) continue;
        var len = numbers[p].length;
        for (var i=0; i<len; i++) {
            if (!match(number,numbers[p][i])) continue;
            if (!numberObjects[p]) numberObjects[p] = [];
            if (!numberObjects[p][i])
                numberObjects[p][i] = new Figure(p,numbers[p][i]);
            links.push(numberObjects[p][i]);
        }
    }
    return links;
}
function match(x,y) { // obvious matching condition
    if (x.toString().slice(2) === y.toString().slice(0,2))
        return true;
}
var numberObjects = []; // object array parallel to numbers array
for (var p=0; p<numbers.length; p++) { // conversion loop
    var len = numbers[p].length;
    if (!numberObjects[p]) numberObjects[p] = [];
    for (var i=0; i<len; i++) {
        var links = findLinksFor(p,numbers[p][i]);
        if (!numberObjects[p][i]) 
            numberObjects[p][i] = new Figure(p,numbers[p][i],links);
        else numberObjects[p][i].links = links;
    }
}

// Part III - find a path of a given size if any

function find(steps,orders,figure,target) { // tree search algorithm
    if (steps === 1) {
        var links = figure.links.filter(v=>v.order===target.order);
        for (var link of links)
            if (link === target) return [figure.number];
    } else {
        var links = figure.links.filter(v=>orders.indexOf(v.order)<0);
        for (var link of links) {
            var next = find(steps-1,orders.concat(figure.order),link,target);
            if (next) return [figure.number].concat(next);
        }
    }
    return false;
}

var size = 6, startOrder = 0,
    start = numberObjects[startOrder]; // starting with triangle numbers
for (var obj of start) {
    var res = find(size,[startOrder],obj,obj);
    if (res) break;
}

console.log(res); // [ 8256, 5625, 2512, 1281, 8128, 2882 ]
console.log(res.reduce((a,b)=>a+b)); // 28684
