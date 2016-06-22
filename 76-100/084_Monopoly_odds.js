// Board = array of 40 squares
// Probability of visiting each square can be calculated iteratively
// On each iteration, the probability for each square is 
// the sum of probabilities to reach this square from all other squares,
// the sums normalized at the end and iterations are repeated until desired precision.
// Probability may be thought of population density in the limit of very large number of players.
// Probability then is the difference between incoming population and outgoing population (in the same step).
// Starting distribution - even probabilities for visitable squares.
// Model: squares can be represented by objects that describe rules for each square,
// particularly - the ways to get there and associated probabilities.

var DICE = 4;

function Square(pop,pos,ways) {
    //this.pop = pop; // population or probability of visiting(staying) make a getter
    this.popIn = pop; // incoming population
    this.stay = 1; // fraction of staying population
    this.pos = pos; // position index
    this.ways = ways; // ways to get there and associated probabilities
    this.otherWays = [];
}

Object.defineProperty(Square.prototype,'pop',{get: function() {return this.popIn*this.stay;}});

function waysToGetThere(n) {
    var ways = [], dice = DICE;
    for (var i=0; i<2*dice-1; i++) {
        var k = (n-i-2+40)%40, // indices of squares behind
            p = (i<dice?i+1:2*dice-i-1)/dice/dice; // - Math.pow(dice,-3); // correcting for 3rd double
        ways.push([k,p]);
    }
    return ways;
}

function addOtherWays(s,arr,p) {
    for (var a of arr)
        s.otherWays.push([a,p]);
}

function show(b) {
    for (var i=0; i<4; i++) {
        var str = '';
        for (var j=0; j<10; j++) {
            str += ' ' + board[i*10+j].pop.toFixed(5);
        }
        console.log(str);
    }
}

// Main:
var board = []; // array of squares
for (var i=0; i<40; i++) {
    var square = new Square(0,i,waysToGetThere(i));
    if (i === 0) { // go
        square.popIn = 1;
        addOtherWays(square,[2,17,33],1/16); //CC
        addOtherWays(square,[7,22,36],1/16); //CH
    }
    if (i === 30) square.stay = 0; // go to jail
    if (i === 2 || i === 17 || i === 33) { // CC
        square.stay = 7/8;
    }
    if (i === 7 || i === 22 || i === 36) { // CH
        square.stay = 6/16;
    }
    if (i === 10) { // jail
        addOtherWays(square,[30],1);
        addOtherWays(square,[2,17,33],1/16); //CC
        addOtherWays(square,[7,22,36],1/16); //CH
    }
    if (i === 5 || i === 11 || i === 24 || i === 39) { // R1, C1, E3, H2
        addOtherWays(square,[7,22,36],1/16); //CH
    }
    if (i === 5) { // R1
        addOtherWays(square,[36],1/8); //CH3
    }
    if (i === 15) { // R2
        addOtherWays(square,[7],1/8); //CH1
    }
    if (i === 25) { // R3
        addOtherWays(square,[22],1/8); //CH2
    }
    if (i === 12) { // U1
        addOtherWays(square,[7],1/16); //CH1
    }
    if (i === 28) { // U2
        addOtherWays(square,[22],1/16); //CH2
    }
    if (i === 4) { // T1
        addOtherWays(square,[7],1/16); //CH1
    }
    if (i === 19) { // D3
        addOtherWays(square,[22],1/16); //CH2
    }
    if (i === 33) { // CC3
        addOtherWays(square,[26],1/16); //CH3
    }
    board.push(square);
}

for (var j=0; j<100; j++) {
    var pop = [], sum = 0;
    for (var i=0; i<40; i++) {
        var p = board[i].ways.reduce((s,w)=>s+board[w[0]].pop*w[1],0) +
                board[i].otherWays.reduce((s,w)=>s+board[w[0]].popIn*w[1],0) ; // add up probabilities
        //if (i === 10) p += Math.pow(DICE,-3); // probability of 3rd double
        pop.push(p);
        sum += board[i].pop;
    }
    for (var i=0; i<40; i++) {
        board[i].popIn = pop[i]/sum;
    }
}
show(board);
// 0.02871 0.01848 0.01749 0.02133 0.02386 0.03032 0.02201 0.00822 0.02238 0.02228                                                                                                                       
// 0.06001 0.02583 0.02359 0.02510 0.02815 0.03463 0.03124 0.02630 0.02926 0.03023                                                                                                                       
// 0.02955 0.02990 0.01112 0.02957 0.03286 0.03094 0.02648 0.02558 0.02863 0.02776                                                                                                                       
// 0.00000 0.02852 0.02614 0.02263 0.02238 0.02043 0.00808 0.02196 0.02140 0.02570  
var a = board.slice().sort((a,b)=>b.pop-a.pop);
console.log(a[0].pos,a[1].pos,a[2].pos); // 10 15 24 
