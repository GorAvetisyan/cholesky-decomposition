const { Complex } = require("../Complex");

describe("ComplexNumber", () => {
  it("calculates argument for positive real and positive imaginary parts", () => {
    const complexNumber = new Complex(3, 4);
    expect(complexNumber.argument()).toBeCloseTo(0.93, 2); // Adjust the expected value and precision as needed
  });

  it("calculates argument for negative real and positive imaginary parts", () => {
    const complexNumber = new Complex(-3, 4);
    expect(complexNumber.argument()).toBeCloseTo(Math.PI - 0.93, 2);
  });

  it("calculates argument for positive real and negative imaginary parts", () => {
    const complexNumber = new Complex(3, -4);
    expect(complexNumber.argument()).toBeCloseTo(-0.93, 2);
  });

  it("calculates argument for zero imaginary part", () => {
    const complexNumber = new Complex(3, 0);
    expect(complexNumber.argument()).toBeCloseTo(0, 2);
  });

  it("calculates argument for zero real part and positive imaginary part", () => {
    const complexNumber = new Complex(0, 4);
    expect(complexNumber.argument()).toBeCloseTo(Math.PI / 2, 2);
  });

  it("calculates argument for zero real and zero imaginary parts", () => {
    const complexNumber = new Complex(0, 0);
    expect(complexNumber.argument()).toBeNaN();
  });

  it("calculates argument for positive real and zero imaginary part", () => {
    const complexNumber = new Complex(3, 0);
    expect(complexNumber.argument()).toBeCloseTo(0, 2);
  });

  it("calculates argument for zero real part and negative imaginary part", () => {
    const complexNumber = new Complex(0, -4);
    expect(complexNumber.argument()).toBeCloseTo(-Math.PI / 2, 2);
  });
});
