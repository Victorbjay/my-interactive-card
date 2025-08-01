// --- DOM Elements ---
const cardholderNameInput = document.getElementById("cardholder-name");
const cardNumberInput = document.getElementById("card-number");
const expMonthInput = document.getElementById("exp-month-input");
const expYearInput = document.getElementById("exp-year-input");
const cvcInput = document.getElementById("cvc-input");

const cardName = document.querySelector(".card-holder-name");
const cardNumber = document.querySelector(".card-number");
const cardExpMonth = document.querySelector(".exp-month");
const cardExpYear = document.querySelector(".exp-year");
const cardCvc = document.querySelector(".card-cvc");

const form = document.getElementById("card-form");
const completedState = document.getElementById("completed-state");
const continueBtn = document.getElementById("continue-btn");

// --- Real-Time Update Functions ---
cardholderNameInput.addEventListener("input", () => {
  cardName.textContent = cardholderNameInput.value || "Jane Appleseed";
});

cardNumberInput.addEventListener("input", (e) => {
  let formattedNumber = e.target.value.replace(/\D/g, "").substring(0, 16);
  formattedNumber = formattedNumber.replace(/(\d{4})/g, "$1 ").trim();
  e.target.value = formattedNumber;
  cardNumber.textContent = formattedNumber || "0000 0000 0000 0000";
});

expMonthInput.addEventListener("input", () => {
  let month = expMonthInput.value.padStart(2, "0");
  cardExpMonth.textContent = month.slice(0, 2) || "00";
});

expYearInput.addEventListener("input", () => {
  let year = expYearInput.value.padStart(2, "0");
  cardExpYear.textContent = year.slice(0, 2) || "00";
});

cvcInput.addEventListener("input", () => {
  cardCvc.textContent = cvcInput.value.slice(0, 3) || "000";
});

// --- Form Validation ---
function showError(inputElement, message) {
  const formGroup = inputElement.parentElement;
  const errorEl =
    formGroup.querySelector(".error-message") ||
    formGroup.parentElement.querySelector(".error-message");
  inputElement.classList.add("input-error");
  if (errorEl) {
    errorEl.textContent = message;
  }
}

function clearError(inputElement) {
  const formGroup = inputElement.parentElement;
  const errorEl =
    formGroup.querySelector(".error-message") ||
    formGroup.parentElement.querySelector(".error-message");
  inputElement.classList.remove("input-error");
  if (errorEl) {
    errorEl.textContent = "";
  }
}

function validateForm() {
  let isValid = true;
  clearError(cardholderNameInput);
  clearError(cardNumberInput);
  clearError(expMonthInput);
  clearError(expYearInput);
  expYearInput.classList.remove("input-error");
  clearError(cvcInput);

  if (!cardholderNameInput.value) {
    showError(cardholderNameInput, "Can't be blank");
    isValid = false;
  }

  if (!cardNumberInput.value) {
    showError(cardNumberInput, "Can't be blank");
    isValid = false;
  } else if (/[a-zA-Z]/.test(cardNumberInput.value.replace(/\s/g, ""))) {
    showError(cardNumberInput, "Wrong format, numbers only");
    isValid = false;
  } else if (cardNumberInput.value.replace(/\s/g, "").length < 16) {
    showError(cardNumberInput, "Card number must be 16 digits");
    isValid = false;
  }

  const month = parseInt(expMonthInput.value, 10);
  const year = parseInt(expYearInput.value, 10);
  const currentYear = new Date().getFullYear() % 100;
  const currentMonth = new Date().getMonth() + 1;

  if (!expMonthInput.value) {
    showError(expMonthInput, "Can't be blank");
    isValid = false;
  } else if (month < 1 || month > 12) {
    showError(expMonthInput, "Must be a valid month");
    isValid = false;
  }

  if (!expYearInput.value) {
    showError(expYearInput, "Can't be blank");
    isValid = false;
  } else if (
    year < currentYear ||
    (year === currentYear && month < currentMonth)
  ) {
    showError(expYearInput, "Card has expired");
    isValid = false;
  }

  if (!cvcInput.value) {
    showError(cvcInput, "Can't be blank");
    isValid = false;
  } else if (cvcInput.value.length < 3) {
    showError(cvcInput, "Must be 3 digits");
    isValid = false;
  }

  return isValid;
}

// --- Event Listeners ---
form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (validateForm()) {
    form.classList.add("hidden");
    completedState.classList.remove("hidden");
  }
});

continueBtn.addEventListener("click", () => {
  form.reset();
  cardName.textContent = "Jane Appleseed";
  cardNumber.textContent = "0000 0000 0000 0000";
  cardExpMonth.textContent = "00";
  cardExpYear.textContent = "00";
  cardCvc.textContent = "000";
  clearError(cardholderNameInput);
  clearError(cardNumberInput);
  clearError(expMonthInput);
  expYearInput.classList.remove("input-error");
  clearError(expYearInput);
  clearError(cvcInput);
  completedState.classList.add("hidden");
  form.classList.remove("hidden");
});
