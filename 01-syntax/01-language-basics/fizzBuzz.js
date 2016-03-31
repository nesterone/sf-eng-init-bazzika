var digit = 1;

for (;digit <= 100; digit++) {
  if (digit % 3 === 0 && digit % 5 === 0) {
    console.log('FizzBuzz');
  } else if (digit % 3 === 0) {
    console.log('Fizz');
  } else if (digit % 5 === 0){
    console.log('Buzz');
  } else {
      console.log(digit);
  }
}
