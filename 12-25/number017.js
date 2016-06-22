var numbers = {
    '0': 'zero',
    '1': 'one',
    '2': 'two',
    '3': 'three',
    '4': 'four',
    '5': 'five',
    '6': 'six',
    '7': 'seven',
    '8': 'eight',
    '9': 'nine',
    '10': 'ten',
    '11': 'eleven',
    '12': 'twelve',
    '13': 'thirteen',
    '14': 'fourteen',
    '15': 'fifteen',
    '16': 'sixteen',
    '17': 'seventeen',
    '18': 'eighteen',
    '19': 'nineteen',
    '20': 'twenty',
    '30': 'thirty',
    '40': 'forty',
    '50': 'fifty',
    '60': 'sixty',
    '70': 'seventy',
    '80': 'eighty',
    '90': 'ninety',
    '100': 'hundred',
    '1000': 'thousand'
};

var lengths = {};
for (var number in numbers)
    lengths[number] = numbers[number].length;
    
var sum10 = 0, sum20 = 0, sum100 = 0, sum1000 = 0;
for (var i=1; i<10; i++) sum10 += lengths[i];

for (var i=1; i<20; i++) sum20 += lengths[i];
sum100 = sum20;

for (var i=2; i<10; i++) {
    sum100 += lengths[i*10]*10 + sum10;
}

sum1000 = sum100;
for (var i=1; i<10; i++) {
    sum1000 += (lengths[i] + lengths[100])*100 + 3*99 + sum100; // and -> +3
}
sum1000 += lengths[1] + lengths[1000];

console.log(sum1000);
