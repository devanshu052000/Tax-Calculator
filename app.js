const form = document.querySelector("form");
const gross = document.querySelector("#gross");
const extra = document.querySelector("#extra");
const age = document.querySelector("#age");
const deductions = document.querySelector("#total");
const modal = document.querySelector("#modal");
const closeBtn = document.querySelector("#close");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const grossIncome = parseInt(gross.value);
  const extraIncome = parseInt(extra.value);
  const ageGroup = parseInt(age.value);
  const totalDeductions = parseInt(deductions.value);

  if (validate(gross.value, extra.value, ageGroup, deductions.value)) {
    return;
  } else {
    const tax = calculateTax(
      grossIncome,
      extraIncome,
      ageGroup,
      totalDeductions
    );
    const inHandIncome = grossIncome + extraIncome - totalDeductions - tax;
    const ans = document.querySelector(".answer");
    ans.textContent = inHandIncome;
    modal.style.display = "block";
  }
});

const validate = (grossIncome, extraIncome, ageGroup, totalDeductions) => {
  let flag = 0;
  if (!isValidIncome(grossIncome)) {
    showError(1);
    flag = 1;
  } else {
    hideError(1);
  }
  if (!isValidIncome(extraIncome)) {
    showError(2);
    flag = 1;
  } else {
    hideError(2);
  }
  if (!isValidAge(ageGroup)) {
    showError(3);
    flag = 1;
  } else {
    hideError(3);
  }
  if (!isValidIncome(totalDeductions)) {
    showError(4);
    flag = 1;
  } else {
    hideError(4);
  }
  if (flag == 1) {
    return true;
  } else {
    return false;
  }
};

const showError = (errNo) => {
  const error = document.querySelector(`.error${errNo}`);
  error.style.display = "inline-block";
};

const hideError = (errNo) => {
  const error = document.querySelector(`.error${errNo}`);
  error.style.display = "none";
};

const calculateTax = (grossIncome, extraIncome, ageGroup, totalDeductions) => {
  const overallIncome = grossIncome + extraIncome - totalDeductions;
  let tax = 0;
  if (overallIncome <= 800000) {
    tax = 0;
  } else if (ageGroup == 40) {
    tax = 0.3 * (overallIncome - 800000);
  } else if (ageGroup == 50) {
    tax = 0.4 * (overallIncome - 800000);
  } else if (ageGroup == 60) {
    tax = 0.1 * (overallIncome - 800000);
  }
  return tax;
};

const isValidAge = (age) => {
  if (age === 0) {
    return false;
  } else {
    return true;
  }
};

const isValidIncome = (income) => {
  if (isNaN(income.trim()) || income < 0) {
    return false;
  } else if (income === "") {
    return false;
  } else {
    return true;
  }
};

closeBtn.onclick = () => {
  modal.style.display = "none";
};

window.onclick = (event) => {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
