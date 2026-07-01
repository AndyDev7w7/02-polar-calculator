export function calculate(left, operator, right) {
  const a = Number(left);
  const b = Number(right);
  if (!Number.isFinite(a) || !Number.isFinite(b)) {
    throw new Error("Invalid input");
  }
  switch (operator) {
    case "+":
      return a + b;
    case "-":
      return a - b;
    case "*":
      return a * b;
    case "/":
      if (b === 0) throw new Error("Division by zero");
      return a / b;
    default:
      throw new Error("Unsupported operator");
  }
}

export function formatNumber(value) {
  if (!Number.isFinite(Number(value))) return "Error";
  const rounded = Number.parseFloat(Number(value).toFixed(10));
  return String(rounded);
}

export function appendDigit(current, digit) {
  if (digit === "." && current.includes(".")) return current;
  if (current === "0" && digit !== ".") return digit;
  if (current === "-0" && digit !== ".") return `-${digit}`;
  return `${current}${digit}`;
}
