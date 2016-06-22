function* cubeMaker(){ // generator of cube sides
  for (var a=0; a<5; a++)
    for (var b=a+1; b<6; b++)
        for (var c=b+1; c<7; c++) 
            for (var d=c+1; d<8; d++)
                for (var e=d+1; e<9; e++)
                    for (var f=e+1; f<10; f++)
                        yield [a,b,c,d,e,f];
}

function paired(a,b) { // return true if a and paired to form all squares
    var check = (x,y) =>
            (a.indexOf(x)>-1 && b.indexOf(y)>-1) || (a.indexOf(y)>-1 && b.indexOf(x)>-1), 
        squares = [[0,1],[0,4],[0,9],[1,6],[2,5],[3,6],[4,9],[6,4],[8,1]];
        
    for (var square of squares) 
        if (!check(square[0],square[1])) return false;
    return true;
}

var cube1 = cubeMaker(),
    memo = [], // used to check for duplicates (not necessary with more efficient solutions)
    count = 0;
    
for (var c1 of cube1) {
    var cc1 = c1.slice();
    if (/[69]/g.test(c1.join(''))) cc1 = cc1.concat(6,9);
    var cube2 = cubeMaker();
    for (var c2 of cube2) {
        var cc2 = c2.slice();
        if (/[69]/g.test(c2.join(''))) cc2 = cc2.concat(6,9);
        if (paired(cc1,cc2)) {
            var s1 = c1.join(''),
                s2 = c2.join('');
            var str = [s1,s2].sort().join('');
            if (memo.indexOf(str)<0) {memo.push(str); count++;}
        }
    }
}

console.log(count); // 1217


