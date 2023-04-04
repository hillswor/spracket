let apiKey = "34eac09b0f8348b3912237e3325d9bd4";
const url = `https://ipgeolocation.abstractapi.com/v1/?api_key=${apiKey}`;
const gallery = document.querySelector(".gallery");

function httpGetAsync(url, callback) {
  const xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = function () {
    if (xmlHttp.readyState === 4 && xmlHttp.status === 200)
      callback(xmlHttp.responseText);
  };
  xmlHttp.open("GET", url, true); // true for asynchronous
  xmlHttp.send(null);
}

function renderDisplayCardsOnPageLoad(bike) {
  const card = document.createElement("div");
  card.setAttribute("class", "card");
  const img = document.createElement("img");
  img.setAttribute("src", bike.large_img);
  const location = document.createElement("p");
  location.textContent = getCityAndState(bike);
  const bikeDetails = document.createElement("button");
  bikeDetails.textContent = "BIKE DETAILS";
  bikeDetails.addEventListener("click", (e) => {
    renderDetailsOnClick(bike, card);
  });
  card.appendChild(bikeDetails);
  card.appendChild(location);
  card.appendChild(img);
  gallery.appendChild(card);
}

function getMonthName(monthNumber) {
  const date = new Date();
  date.setMonth(monthNumber - 1);

  return date.toLocaleString("en-US", {
    month: "long",
  });
}

function getDateStolen(bike) {
  const timestamp = bike.date_stolen;
  const date = new Date(timestamp * 1000);
  const month = getMonthName(date.getMonth() + 1);
  const day = date.getDate();
  const year = date.getFullYear();
  const dateStolenString = `Date Stolen: ${month} ${day}, ${year}`;
  return dateStolenString;
}

function getCityAndState(bike) {
  const address = bike.stolen_location;
  const parts = address.split(", ");
  const city = parts[0];
  const state = parts[1].split(" ")[0];
  return `${city}, ${state}`;
}

function renderDetailsOnClick(bike, card) {
  card.innerHTML = "";
  const viewBikeImg = document.createElement("button");
  viewBikeImg.textContent = "VIEW IMAGE";
  const description = document.createElement("p");
  description.textContent = bike.title;
  const serialNumber = document.createElement("p");
  const serialNumberString = `Serial Number: ${bike.serial}`;
  serialNumber.textContent = serialNumberString;
  const dateStolen = document.createElement("p");
  dateStolen.textContent = getDateStolen(bike);
  viewBikeImg.addEventListener("click", (e) => {
    renderImgAndTitleOnClick(bike, card);
  });
  card.appendChild(viewBikeImg);
  card.appendChild(description);
  card.appendChild(serialNumber);
  card.appendChild(dateStolen);
}

function renderImgAndTitleOnClick(bike, card) {
  card.innerHTML = "";
  const img = document.createElement("img");
  img.setAttribute("src", bike.large_img);
  const location = document.createElement("p");
  location.textContent = getCityAndState(bike);
  const bikeDetails = document.createElement("button");
  bikeDetails.textContent = "BIKE DETAILS";
  bikeDetails.addEventListener("click", (e) => {
    renderDetailsOnClick(bike, card);
  });
  card.appendChild(bikeDetails);
  card.appendChild(location);
  card.appendChild(img);
}

function initialize(response) {
  locationObject = JSON.parse(response);
  const zipCode = locationObject.postal_code;

  fetch(
    `https://bikeindex.org:443/api/v3/search?page=1&per_page=6&query=image&location=${zipCode}&distance=50&stolenness=proximity`
  )
    .then((response) => response.json())
    .then((stolenBikes) => {
      //   console.log(stolenBikes);
      bikeInfo = stolenBikes.bikes.filter((x) => x.large_img);
      bikeInfo.forEach(renderDisplayCardsOnPageLoad);
    });
}

httpGetAsync(url, initialize);
