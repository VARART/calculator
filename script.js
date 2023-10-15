const loanAmountInput = document.getElementById("loan-amount");
const repaymentPeriodInput = document.getElementById("repayment-period");
const loanAmountSlider = document.getElementById("loan-amount-slider");
const repaymentPeriodSlider = document.getElementById("repayment-period-slider");
const calculateButton = document.getElementById("calculate-button");
const dailyRepaymentSpan = document.getElementById("daily-repayment");
const totalRepaymentSpan = document.getElementById("total-repayment");

const interestRate = 2.2; // Відсоткова ставка (2.2%)

// Функція для розрахунку денної суми погашення
function calculateDailyRepayment(loanAmount, repaymentPeriod) {
    return (loanAmount + (loanAmount * (interestRate / 100) * repaymentPeriod)) / repaymentPeriod;
}

// Функція для розрахунку загальної суми погашення
function calculateTotalRepayment(dailyRepayment, repaymentPeriod) {
    return dailyRepayment * repaymentPeriod;
}

// Оновлення результатів розрахунку
function updateResults() {
    const loanAmount = parseFloat(loanAmountInput.value);
    const repaymentPeriod = parseInt(repaymentPeriodInput.value);
    
    const dailyRepayment = calculateDailyRepayment(loanAmount, repaymentPeriod);
    const totalRepayment = calculateTotalRepayment(dailyRepayment, repaymentPeriod);
    
    dailyRepaymentSpan.textContent = dailyRepayment.toFixed(2) + " грн";
    totalRepaymentSpan.textContent = totalRepayment.toFixed(2) + " грн";
}

// Слухачи подій для полів введення та слайдерів
loanAmountInput.addEventListener("input", updateResults);
repaymentPeriodInput.addEventListener("input", updateResults);
loanAmountSlider.addEventListener("input", () => {
    loanAmountInput.value = loanAmountSlider.value;
    updateResults();
});
repaymentPeriodSlider.addEventListener("input", () => {
    repaymentPeriodInput.value = repaymentPeriodSlider.value;
    updateResults();
});

// Валідація полів та активація/деактивація кнопки
loanAmountInput.addEventListener("input", () => {
    const loanAmount = parseFloat(loanAmountInput.value);
    if (loanAmount < 1000 || loanAmount > 50000) {
        loanAmountInput.setCustomValidity("Сума кредиту повинна бути від 1000 до 50000 грн");
    } else {
        loanAmountInput.setCustomValidity("");
    }
    updateResults();
    calculateButton.disabled = !loanAmountInput.checkValidity() || !repaymentPeriodInput.checkValidity();
});

repaymentPeriodInput.addEventListener("input", () => {
    const repaymentPeriod = parseInt(repaymentPeriodInput.value);
    if (repaymentPeriod < 7 || repaymentPeriod > 60) {
        repaymentPeriodInput.setCustomValidity("Період погашення повинен бути від 7 до 60 днів");
    } else {
        repaymentPeriodInput.setCustomValidity("");
    }
    updateResults();
    calculateButton.disabled = !loanAmountInput.checkValidity() || !repaymentPeriodInput.checkValidity();
});

// Слухач події для відправлення форми
document.getElementById("credit-form").addEventListener("submit", (e) => {
    e.preventDefault();
    // Тут ви можете додати код для надсилання даних на сервер або інші дії за необхідності.
});

// Початкове оновлення результатів
updateResults();
