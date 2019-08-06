const { calculateTip, fahrenheitToCelsius, celsiusToFahrenheit } = require('../src/math')

test('calculate total with tip ', () => {
    const total = calculateTip(10, .3)
    expect(total).toBe(13);
})


test('calculate total with default', () => {
    const total = calculateTip(10);
    expect(total).toBe(12.5);
})

test('Should convert 32 F to 0 C', () => {
    const convert = fahrenheitToCelsius(32);
    expect(convert).toBe(0);
})

test('Should convert 0 C to 32 F', () => {
    const convert = celsiusToFahrenheit(0);
    expect(convert).toBe(32);
})

