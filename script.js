const fromCurrency = document.getElementById("fromCurrency");
const toCurrency = document.getElementById("toCurrency");
const result = document.getElementById("result");

const currencies = ["USD", "EUR", "INR", "JPY", "GBP", "AUD", "CAD"];

currencies.forEach((curr) => {
  fromCurrency.innerHTML += `<option value="${curr}">${curr}</option>`;
  toCurrency.innerHTML += `<option value="${curr}">${curr}</option>`;
});

fromCurrency.value = "USD";
toCurrency.value = "INR";

async function convertCurrency() {
  const amount = document.getElementById("amount").value;
  if (amount === "" || amount <= 0) {
    result.innerText = "Enter a valid amount.";
    return;
  }

  const from = fromCurrency.value;
  const to = toCurrency.value;

  try {
    const res = await fetch(`https://api.exchangerate-api.com/v4/latest/${from}`);
    const data = await res.json();
    const rate = data.rates[to];
    const converted = (amount * rate).toFixed(2);

    result.innerText = `${amount} ${from} = ${converted} ${to}`;
  } catch (error) {
    result.innerText = "Failed to fetch exchange rate.";
  }
}
