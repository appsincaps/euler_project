function isPalindrome(str) {
    return str === str.split('').reverse().join('');
}
var sum = 0 + 1 + 3 + 5 + 7 + 9; // all single digits palindromic in binary
for (var n=1; n<1000; n+=2) {
    var num = n.toString(),
        rev = num.split('').reverse().join(''),
        number = Number(rev + num); //build decimal palindrome
    if (isPalindrome(number.toString(2))) 
        sum += number;
    if (n<100) {
        for (var i=0; i<10; i++) {
            number = Number(rev + i + num); //build decimal palindrome
            if (isPalindrome(number.toString(2))) 
                sum += number;
        }
        // edge case numbers of form: xx00xx (missing zeros):
        for (var i of ['00','000','0000']) {
            number = Number(rev + i + num);
            if (number<1000000 && isPalindrome(number.toString(2)))
                sum += number;
        }
    }
}
console.log(sum); // 872187