// select a number set [a,b,c,d]
// represent each number with an object:
// e.g. a -> {val:a}
// use an ordered pair of object to produce another object:
// e.g. oper(a,b) -> {operation: (+-*/), params: [a,b], val: result}
// do with each pair and add additional objects to the list
// repeat the same two more times
// collect results and check for continuous number set: 1...

var symbols = ['+','*','-','/'];
var func = [(x,y)=>x+y, (x,y)=>x*y,
            (x,y)=>x-y, (x,y)=>x/y];

function Operand(oper,p1,p2,sign) {
    if (typeof oper === 'number') {
        this.val = oper;
        this.params = [oper];
        this.form = oper.toString();
    } else if (typeof oper === 'function') {
        this.params = p1.params.concat(p2.params);
        this.val = oper(p1.val,p2.val);
        this.form = '('+p1.form+sign+p2.form+')';
    }
}

function Set(a) {
    this.nums = a.join('');
    this.ops = [];
    for (var num of a) 
        this.ops.push(new Operand(num));
}

Set.prototype.mix = function() {
    var len = this.ops.length;
    for (var i=0; i<len; i++) {
        for (var j=0; j<len; j++) {
            if (i===j) continue;
            for (var f=0; f<4; f++) {
                if (f===3 && this.ops[j].val===0) continue;
                if (j<i && f<2) continue;
                var a = this.ops[i],
                    b = this.ops[j];
                if (!overlap(a,b))
                    this.ops.push(new Operand(func[f],a,b,symbols[f]));
            }
        }
    }
}

Set.prototype.process = function() {
    for (var i=0; i<3; i++) this.mix();
    var arr = this.ops
            .filter(v=>v.params.length===4)
            .map((v)=>v.val);
    for (var i=1; i<1000; i++)
        if (arr.indexOf(i)<0) break;
    return i-1;
}

function overlap(p1,p2) {
    for (var p of p1.params)
        if (p2.params.indexOf(p)>-1) return true;
    return false;
}

function* makeSet() {
    for (var a=1; a<=6; a++)
        for (var b=a+1; b<=7; b++)
            for (var c=b+1; c<=8; c++)
                for (var d=c+1; d<=9; d++)
                    yield new Set([a,b,c,d]);
}

var sets = makeSet(), 
    result, max = 0;
for (var s of sets) {
    var res = s.process();
    if (res > max) {
        max = res; result = s;
    }
    //console.log(s.nums,res);
}
console.log(max,result.nums); // 51, 1258