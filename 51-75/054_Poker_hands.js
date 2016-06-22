var fs = require('fs');
var source = 'p054_poker.txt';
var data = fs.readFileSync(source, "utf8").trim().split('\n');
var ref = '23456789TJQKA'; // cards in acending order

function hands(s) {
    s = s.split(' ');
    return [s.slice(0,5), s.slice(5,10)];
}
function compare(s) { // compare two hands: 1-1st wins, -1-2nd wins, 0-tie
    s = hands(s);
    var r1 = rank(s[0]), r2 = rank(s[1]);
    if (r1 > r2) return 1;
    if (r2 > r1) return -1;
    /*
    if (r1 === 9) { // low probability
        var v1 = maxValue(s[0]),
            v2 = maxValue(s[1]);
        return v1>v2 ? 1 : v1<v2 ? -1 : 0;
    }
    if (r1 === 8) { // low probability
        var v1 = fourHand(s[0]),
            v2 = fourHand(s[1]);
        return v1[0]>v2[0] ? 1 : v1[0]<v2[0] ? -1 :
                v1[1]>v2[1] ? 1 : v1[1]<v2[1] ? -1 : 0;
    }
    */
    // missing r1 = 3,4,5,6,7,8,9 - low probability, not necessary
    
    if (r1 === 2) { // high probability
        var v1 = pairHand(s[0]),
            v2 = pairHand(s[1]);
        for (var i=0; i<v1.length; i++)
            if (v1[i] > v2[i]) return 1;
            else if (v1[i] < v2[i]) return -1;
        return 0;
    }
    if (r1 === 1) { // high probability
        var v1 = values(s[0]),
            v2 = values(s[1]);
        for (var i=0; i<v1.length; i++)
            if (v1[i] > v2[i]) return 1;
            else if (v1[i] < v2[i]) return -1;
        return 0;
    }
    return 0; // default
}

for (var count=0,i=0; i<1000; i++)
    if (compare(data[i]) === 1) count++;

console.log(count); // 376
/*
Ranks:
1 - High Card: Highest value card.
2 - One Pair: Two cards of the same value.
3 - Two Pairs: Two different pairs.
4 - Three of a Kind: Three cards of the same value.
5 - Straight: All cards are consecutive values.
6 - Flush: All cards of the same suit.
7 - Full House: Three of a kind and a pair.
8 - Four of a Kind: Four cards of the same value.
9 - Straight Flush: All cards are consecutive values of same suit.
10 - Royal Flush: Ten, Jack, Queen, King, Ace, in same suit.
*/

function pair(a) {
    return /(\w)\1/.test(a.slice().sort().join(''));
}
function twoPair(a) {
    var p = a.slice().sort().join('').match(/(\w)\1/);
    return pair(a) && pair(a.filter(v=>v!==p[1]));
}
function three(a) {
    return /(\w)\1{2}/.test(a.slice().sort().join(''));
}
function straight(a) {
    return a.map(v=>ref.indexOf(v)).sort((a,b)=>+a-b)
            .every((v,i,a)=>i===0||v-a[i-1]===1);
}
function flush(a) {
    return a.every(v=>v===a[0]);
}
function full(a) {
    var t = a.slice().sort().join('').match(/(\w)\1{2}/);
    return three(a) && pair(a.filter(v=>v!==t[1]));
}
function four(a) {
    return /(\w)\1{3}/.test(a.slice().sort().join(''));
}
function royal(a) {
    return a.slice().sort().join('') === 'AJKQT';
}
function rank(h) {
    var h1 = h.map(v=>v[0]), h2 = h.map(v=>v[1]);
    if (royal(h1) && flush(h2)) return 10;
    if (straight(h1) && flush(h2)) return 9;
    if (four(h1)) return 8;
    if (full(h1)) return 7;
    if (flush(h2)) return 6;
    if (straight(h1)) return 5;
    if (three(h1)) return 4;
    if (twoPair(h1)) return 3;
    if (pair(h1)) return 2;
    return 1;
}
function maxValue(h) {
    var a = h.map(v=>v[0]);
    return a.reduce((s,v)=>s<ref.indexOf(v)?ref.indexOf(v):s,0);
}
function values(h) {
    var a = h.map(v=>v[0]);
    return a.map(v=>ref.indexOf(v)).sort((a,b)=>b-a);
}
function fourHand(h) {
    var a = h.map(v=>v[0]),
        m = a.slice().sort().join('').match(/(\w)\1{3}/)[1],
        r = a.filter(v=>v!==m);
    return [ref.indexOf(m), ref.indexOf(r)];
}
function pairHand(h) {
    var a = h.map(v=>v[0]),
        m = a.slice().sort().join('').match(/(\w)\1/)[1],
        r = a.filter(v=>v!==m);
    return [ref.indexOf(m)].concat(r.map(v=>ref.indexOf(v)).sort((a,b)=>b-a));
}
