var facts = [1,1,2,6,24,120,720,5040,40320,362880], // factorials
    numbers = [];
function checked(digits,n) { // checked if n is composed of digits
    return digits.split('').sort().join('') ===
           n.toString().split('').sort().join('');
}
function loop(n,start,end) { // main function to mimick the loop (n=number of digits)
    var args = Array.prototype.slice.call(arguments,3), // rest arguments
        length = args.length;
    if (length === n) { // if all arguments provided:
        var num = args.reduce((s,v)=>s+facts[v],0),
            numString = args.reduce((s,v)=>s+v,'');
        if (checked(numString,num) && numbers.indexOf(num)<0) 
            numbers.push(num);
    } else { // if not - sends for another loop:
        for (var i=start; i<=end; i++)
            loop.apply(null,[n,0,end].concat(args).concat(i));
    }
}
loop(3,5,6);
//loop(4,6,7); // no 4-digit numbers
loop(5,7,8);
//loop(6,8,9); // no 6-digit numbers
//loop(7,9,9); // no 7-digit numbers
console.log(numbers); // [ 145, 40585 ]
console.log(numbers.reduce((a,b)=>a+b)); // 40730