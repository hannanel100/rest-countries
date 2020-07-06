const all = document.getElementById("all");
const countryName = document.getElementById("country-name");
const content = document.getElementById("content");
let countryDiv = "";

all.addEventListener("click", e => {
  e.preventDefault();
  const url = "https://restcountries.eu/rest/v2/all/?fields=name;capital;currencies;topLevelDomain;flag";
  fetchCountries(url);
});

countryName.addEventListener("click", e => {
  e.preventDefault();
  const countryInput = document.getElementById("country-input");
  const country = countryInput.value;
  const url = `https://restcountries.eu/rest/v2/name/${country}/?fields=name;capital;currencies;topLevelDomain;flag`;
  fetchCountries(url);
});

const fetchCountries = async url => {
  const response = await fetch(url);
  const data = await response.json();
  if (data.status === 404) {
    content.innerHTML = "<h2 class='error'>Country Not Found</h2>";
  } else {
    buildPage(data);
  }
};

const buildPage = countries => {
  content.innerHTML = "";
  const inputContent = document.getElementById("country-input");
  inputContent.value = "";
  document.getElementById("country-input").value.innertext = "";
  const countriesCards = countries.map(country => {
    return buildCard(country);
  });
  content.innerHTML = countriesCards;
};

const buildCard = country => {
  const currency = country.currencies;
  const currencyCode = currency.map(curr => curr.code);
  const currencyName = currency.map(curr => curr.name);
  const currencySymbol = currency.map(curr => curr.symbol);
  const currencyDiv = `<div class="currency"><p>Code: ${currencyCode.map(
    code => code,
  )}</p> <p>Name: ${currencyName.map(
    name => name,
  )} </p> <p>Symbol: ${currencySymbol.map(symbol => symbol)}</p></div>`;
  const countryCard = `<div class="card" style="width: 18rem;">
        <img src=${country.flag} class="card-img-top" alt="country flag...">
        <div class="card-body">
          <h4 class="card-title">Name: ${country.name}</h4>
          <h5 class="card-text">Top Level Domain: ${country.topLevelDomain}</h5>
          <h5 class="card-text">Capital: ${country.capital}</h5>
          <h5 class="card-text">Currencies:  </h5>
          ${currencyDiv}
        </div>
      </div>`;
  return countryCard;
};
