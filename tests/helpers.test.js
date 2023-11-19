const { isNatural } = require("../helpers");

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
