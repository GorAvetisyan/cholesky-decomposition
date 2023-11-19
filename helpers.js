const isNatural = (n) => {
    return typeof n === 'number' && !isNaN(n) && n > 0 && n === Math.floor(n);
}

module.exports = { isNatural };



