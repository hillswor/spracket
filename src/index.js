let apiKey = "34eac09b0f8348b3912237e3325d9bd4";
const url = `https://ipgeolocation.abstractapi.com/v1/?api_key=${apiKey}`;
const gallery = document.querySelector(".gallery");
let distance = 50;

function httpGetAsync(url, callback) {
  const xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = function () {
    if (xmlHttp.readyState === 4 && xmlHttp.status === 200)
      callback(xmlHttp.responseText);
  };
  xmlHttp.open("GET", url, true);
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

const sortedrenderer = (sortedData) => {
  const card = document.createElement("div");
  card.setAttribute("class", "card");
  const cardImage = document.createElement("img");
  cardImage.src = sortedData.large_img;
  const p1 = document.createElement("p");
  p1.setAttribute("id", "bike-name");
  p1.textContent = sortedData.frame_model;
  gallery.innerHTML;
  card.append(cardImage, p1);
  gallery.append(card);
};

function initialize(response) {
  locationObject = JSON.parse(response);
  const zipCode = locationObject.postal_code;

  fetch(
    `https://bikeindex.org:443/api/v3/search?page=1&per_page=6&query=image&location=${zipCode}&distance=50&stolenness=proximity`
  )
    .then((response) => response.json())
    .then((stolenBikes) => {
      bikes = stolenBikes.bikes.filter(
        (x) => x.large_img && x.title && x.description
      );
      bikes.length > 25
        ? bikes.forEach((bike) => renderDisplayCardsOnPageLoad(bike))
        : (distance = 200);
      fetch(
        `https://bikeindex.org:443/api/v3/search?page=1&per_page=100&query=image&location=${zipCode}&distance=${distance}&stolenness=proximity`
      )
        .then((response) => response.json())
        .then((stolenBikes) => {
          bikes = stolenBikes.bikes.filter(
            (x) => x.large_img && x.title && x.description
          );
          bikes.forEach((bike) => renderDisplayCardsOnPageLoad(bike));
        });
    });
}

function filterDateStolen(data, byKey) {
  console.log(byKey);
  let sortedData;
  if (byKey === "date_stolen") {
    sortedData = data.sort(function (a, b) {
      let x = a.date_stolen;
      let y = b.date_stolen;
      if (x > y) {
        return 1;
      }
      if (x < y) {
        return -1;
      }
      return 0;
    });
    sortedData.forEach((bike) => {
      sortedrenderer(bike);
    });
  }
  if (byKey === "manufacturer_name") {
    sortedData = data.sort(function (a, b) {
      let x = a.manufacturer_name;
      let y = b.manufacturer_name;

      if (x > y) {
        return 1;
      }
      if (x < y) {
        return -1;
      }
      return 0;
    });
    sortedData.forEach((bike) => {
      sortedrenderer(bike);
    });
  }
  if (byKey === "stolen_location") {
    console.log("were in the matrix");
    sortedData = data.sort(function (a, b) {
      let x = a.stolen_location;
      let y = b.stolen_location;

      if (x > y) {
        return 1;
      }
      if (x < y) {
        return -1;
      }
      return 0;
    });
    sortedData.forEach((bike) => {
      sortedrenderer(bike);
    });
  }
}

// document.querySelector("select").addEventListener("change", (e) => {
//   gallery.innerHTML = "";
//   const date = "date_stolen";
//   const brand = "manufacturer_name";
//   const location = "stolen_location";

//   if (e.target.value == "Date") {
//     console.log("DATE");
//     filterDateStolen(bikeInfo, date);
//   }
//   if (e.target.value == "Location") {
//     console.log("location");
//     filterDateStolen(bikeInfo, location);
//   } else if (e.target.value == "Manufacturer") {
//     console.log("manufacturer");
//     filterDateStolen(bikeInfo, brand);
//   }
// });

httpGetAsync(url, initialize);