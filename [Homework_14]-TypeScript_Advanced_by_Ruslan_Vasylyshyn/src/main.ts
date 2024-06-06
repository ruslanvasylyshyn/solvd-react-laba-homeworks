import { BasicCalculator } from './calculator';

const calculator = new BasicCalculator();

console.log(calculator.add(2, 3)); // { value: 5, error: '' }
console.log(calculator.subtract(5, 3)); // { value: 2, error: '' }
console.log(calculator.multiply(4, 3)); // { value: 12, error: '' }
console.log(calculator.divide(10, 2)); // { value: 5, error: '' }
console.log(calculator.divide(10, 0)); // { value: 0, error: 'Cannot divide by zero' }
console.log(calculator.power(2, 3)); // { value: 8, error: '' }
console.log(calculator.power(2, -1)); // { value: 0, error: 'Exponent must be a positive integer' }
console.log(calculator.sqrt(16)); // { value: 4, error: '' }
console.log(calculator.sqrt(-1)); // { value: 0, error: 'Cannot calculate square root of negative number' }
