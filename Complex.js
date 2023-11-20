const { isNumber } = require("./helpers");

class Complex {
  constructor(a = 0, b = 0) {
    if (isNumber(a) && isNumber(b)) {
      this.a = a;
      this.b = b;
    } else {
      throw Error("Parameters must be numbers");
    }
  }

  conjugate() {
    return new Complex(this.a, -this.b);
  }

  add(y) {
    if (y instanceof Complex) {
      return new Complex(this.a + y.a, this.b + y.b);
    } else if (isNumber(y)) {
      return new Complex(this.a + y, this.b);
    }
  }

  multiply(y) {
    if (y instanceof Complex) {
      const a = this.a * y.a - this.b * y.b;
      const b = this.a * y.b + this.b * y.a;
      return new Complex(a, b);
    } else if (isNumber(y)) {
      return new Complex(y * this.a, y * this.b);
    }
  }

  substract(y) {
    return this.add(y.multiply(-1));
  }

  mod() {
    return Math.sqrt(this.a ** 2 + this.b ** 2);
  }
    
}


