let all = document.getElementById("all");
let countryName = document.getElementById("country-name");
let content = document.getElementById("content");
let countryDiv = "";

all.addEventListener("click", function (e) {
    e.preventDefault();
    let url = 'https://restcountries.eu/rest/v2/all';
    sendToCountries(url);

})
countryName.addEventListener("click", function (e) {
    e.preventDefault();
    let countryInput = document.getElementById("country-input");
    let country = countryInput.value;
    let url = 'https://restcountries.eu/rest/v2/name/' + country;
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
    let input_content = document.getElementById("country-input");
    input_content.value = "";
    console.log(input_content);
    document.getElementById("country-input").value.innertext = "";
    for (let i = 0; i < countries.length; i++) {
        countryDiv = buildDiv("country");
        countryDiv.setAttribute("class", "row coutry");
        let textDiv = buildDiv("text-cl");
        textDiv.setAttribute("class", "col-sm text-cl");
        let imgDiv = buildDiv("img-cl");
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
    var divElement = document.createElement('div');
    divElement.setAttribute('class', cl);
    return divElement;
}
