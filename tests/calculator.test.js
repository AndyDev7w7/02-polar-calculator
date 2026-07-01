import assert from "node:assert/strict";
import { appendDigit, calculate, formatNumber } from "../src/calculator.js";

assert.equal(calculate(2, "+", 3), 5);
assert.equal(calculate(8, "-", 5), 3);
assert.equal(calculate(4, "*", 6), 24);
assert.equal(calculate(12, "/", 3), 4);
assert.throws(() => calculate(10, "/", 0), /Division by zero/);
assert.throws(() => calculate("ice", "+", 2), /Invalid input/);
assert.equal(formatNumber(1 / 3), "0.3333333333");
assert.equal(appendDigit("0", "8"), "8");
assert.equal(appendDigit("1.2", "."), "1.2");

console.log("Polar Calculator tests passed");
