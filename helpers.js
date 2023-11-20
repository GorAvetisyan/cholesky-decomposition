const isNatural = n => {
  return typeof n === "number" && !isNaN(n) && n > 0 && n === Math.floor(n);
};

// Number class ???

const isNumber = n => {
  return typeof n === "number" && !isNaN(n);
};

module.exports = { isNatural, isNumber };
