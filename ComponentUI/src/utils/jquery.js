$.easing.exponentialEaseOut = function (t) {
    return Math.min(1, 1.001 - Math.pow(2, -10 * t));
};
$.fn.hasAttr = function (name) {
    return this.attr(name) !== undefined;
};
export { exponentialEaseOut, hasAttr }
