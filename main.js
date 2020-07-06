const all = document.getElementById("all");
const countryName = document.getElementById("country-name");
const content = document.getElementById("content");
let countryDiv = "";

all.addEventListener("click", function (e) {
    e.preventDefault();
    const url = 'https://restcountries.eu/rest/v2/all';
    sendToCountries(url);

})
countryName.addEventListener("click", function (e) {
    e.preventDefault();
    const countryInput = document.getElementById("country-input");
    const country = countryInput.value;
    const url = 'https://restcountries.eu/rest/v2/name/' + country;
    sendToCountries(url);

})
function reqListener() {
    var objCountries = JSON.parse(this.responseText);
    buildPage(objCountries);
}

function sendToCountries(url) {
    var oReq = new XMLHttpRequest();
    oReq.addEventListener("load", reqListener);
    oReq.open("GET", url);
    oReq.onloadend = function () {
        if (oReq.status == 404) {
            let textDiv = buildDiv("error");
            textDiv.setAttribute("class", "error");
            textDiv.innerHTML = "Country Not found!";
            content.appendChild(textDiv);
        }
    }
    oReq.send();
}
function buildPage(countries) {
    content.innerHTML = '';
    const inputContent = document.getElementById("country-input");
    inputContent.value = "";
    document.getElementById("country-input").value.innertext = "";
    for (let i = 0; i < countries.length; i++) {
        countryDiv = buildDiv("country");
        countryDiv.setAttribute("class", "row country");
        const textDiv = buildDiv("text-cl");
        textDiv.setAttribute("class", "col-sm text-cl");
        const imgDiv = buildDiv("img-cl");
        imgDiv.setAttribute("class", "col-sm img-cl");
        textDiv.innerHTML += "<div>Name: " + countries[i].name + "</div>";
        textDiv.innerHTML += "<div>Top Leve Domain: " + countries[i].topLevelDomain + "</div>";
        textDiv.innerHTML += "<div>Capital: " + countries[i].capital + "</div>";
        textDiv.innerHTML += "<div>Currencies: " + JSON.stringify(countries[i].currencies) + "</div>";
        countryDiv.appendChild(textDiv);
        imgDiv.innerHTML += "<img src=" + countries[i].flag + " class='rounded img-fluid'>";
        countryDiv.appendChild(imgDiv);
        content.appendChild(countryDiv);
    }
}

function buildDiv(cl) {
    const divElement = document.createElement('div');
    divElement.setAttribute('class', cl);
    return divElement;
}
