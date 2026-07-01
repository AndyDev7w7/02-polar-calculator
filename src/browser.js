(function () {
  function calculate(left, operator, right) {
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

  function formatNumber(value) {
    if (!Number.isFinite(Number(value))) return "Error";
    const rounded = Number.parseFloat(Number(value).toFixed(10));
    return String(rounded);
  }

  function appendDigit(current, digit) {
    if (digit === "." && current.includes(".")) return current;
    if (current === "0" && digit !== ".") return digit;
    if (current === "-0" && digit !== ".") return `-${digit}`;
    return `${current}${digit}`;
  }

  const display = document.querySelector("#display");
  const historyList = document.querySelector("#historyList");
  const clearHistory = document.querySelector("#clearHistory");

  let displayValue = "0";
  let storedValue = null;
  let pendingOperator = null;
  let shouldResetDisplay = false;
  const history = [];

  function updateDisplay() {
    display.value = displayValue;
    display.textContent = displayValue;
  }

  function pushHistory(entry) {
    history.unshift(entry);
    historyList.innerHTML = history.map((item) => `<li>${item}</li>`).join("");
  }

  function setError(message) {
    displayValue = message;
    storedValue = null;
    pendingOperator = null;
    shouldResetDisplay = true;
    updateDisplay();
  }

  function inputNumber(number) {
    if (displayValue === "Error" || shouldResetDisplay) {
      displayValue = "0";
      shouldResetDisplay = false;
    }
    displayValue = appendDigit(displayValue, number);
    updateDisplay();
  }

  function chooseOperator(operator) {
    if (pendingOperator && !shouldResetDisplay) {
      runEquals();
    }
    storedValue = displayValue;
    pendingOperator = operator;
    shouldResetDisplay = true;
  }

  function runEquals() {
    if (!pendingOperator || storedValue === null) return;
    try {
      const result = calculate(storedValue, pendingOperator, displayValue);
      const formatted = formatNumber(result);
      pushHistory(`${storedValue} ${pendingOperator} ${displayValue} = ${formatted}`);
      displayValue = formatted;
      storedValue = null;
      pendingOperator = null;
      shouldResetDisplay = true;
      updateDisplay();
    } catch (error) {
      setError(error.message);
    }
  }

  document.querySelector(".keys").addEventListener("click", (event) => {
    const button = event.target.closest("button");
    if (!button) return;
    if (button.dataset.number) inputNumber(button.dataset.number);
    if (button.dataset.operator) chooseOperator(button.dataset.operator);
    if (button.dataset.action === "equals") runEquals();
    if (button.dataset.action === "clear") {
      displayValue = "0";
      storedValue = null;
      pendingOperator = null;
      updateDisplay();
    }
    if (button.dataset.action === "backspace" && !shouldResetDisplay) {
      displayValue = displayValue.length > 1 ? displayValue.slice(0, -1) : "0";
      updateDisplay();
    }
  });

  clearHistory.addEventListener("click", () => {
    history.length = 0;
    historyList.innerHTML = "";
  });

  updateDisplay();
})();
