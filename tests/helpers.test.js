const { isNatural, isNumber } = require("../helpers");

test("1", () => {
  expect(isNatural(15)).toBe(true);
});

test("2", () => {
  expect(isNatural(-10)).toBe(false);
});

test("3", () => {
  expect(isNatural(0)).toBe(false);
});

test("4", () => {
  expect(isNatural(3.4)).toBe(false);
});

test("5", () => {
  expect(isNatural("10")).toBe(false);
});

test("6", () => {
  expect(isNatural(NaN)).toBe(false);
});

describe("isNumber function", () => {
  it("should return true for a valid positive number", () => {
    const result = isNumber(42);
    expect(result).toBe(true);
  });

  it("should return true for a valid negative number", () => {
    const result = isNumber(-3.14);
    expect(result).toBe(true);
  });

  it("should return true for zero", () => {
    const result = isNumber(0);
    expect(result).toBe(true);
  });

  it("should return false for a non-numeric string", () => {
    const result = isNumber("not a number");
    expect(result).toBe(false);
  });

  it("should return false for an array", () => {
    const result = isNumber([1, 2, 3]);
    expect(result).toBe(false);
  });

  it("should return false for an object", () => {
    const result = isNumber({ key: "value" });
    expect(result).toBe(false);
  });

  it("should return false for null", () => {
    const result = isNumber(null);
    expect(result).toBe(false);
  });

  it("should return false for undefined", () => {
    const result = isNumber(undefined);
    expect(result).toBe(false);
  });

  it("should return false for NaN", () => {
    const result = isNumber(NaN);
    expect(result).toBe(false);
  });
});
