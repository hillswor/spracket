let apiKey = "34eac09b0f8348b3912237e3325d9bd4";
const url = `https://ipgeolocation.abstractapi.com/v1/?api_key=${apiKey}`;
const card = document.querySelector(".card");
const gallery = document.querySelector(".gallery");
let distance = 50;
let bikeInfo;

function httpGetAsync(url, callback) {
  const xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = function () {
    if (xmlHttp.readyState === 4 && xmlHttp.status === 200)
      callback(xmlHttp.responseText);
  };
  xmlHttp.open("GET", url, true);
  xmlHttp.send(null);
}

const renderer = (bikeInfo) => {
  const card = document.createElement("div");
  card.setAttribute("class", "card");
  const cardImage = document.createElement("img");
  cardImage.src = bikeInfo.large_img;
  const p1 = document.createElement("p");
  card.innerHTML = "";
  p1.setAttribute("id", "bike-name");
  p1.textContent = bikeInfo.frame_model;
  card.append(cardImage, p1);
  gallery.append(card);

  cardImage.addEventListener("click", (e) => {
    cardImage.style.opacity = 0.25;
    imageInfo = !imageInfo;
    const p2 = document.createElement("p");
    p2.setAttribute("class", "description");
    p2.textContent = bikeInfo.title;
    card.append(p2);
  });
};

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

function getZipCode(response) {
  locationObject = JSON.parse(response);
  const zipCode = locationObject.postal_code;

  fetch(
    `https://bikeindex.org:443/api/v3/search?page=1&per_page=25&query=image&location=${zipCode}&distance=${distance}&stolenness=proximity`
  )
    .then((response) => response.json())
    .then((stolenBikes) => {
      //   console.log(stolenBikes);
      bikeInfo = stolenBikes.bikes.filter(
        (x) => x.large_img && x.title && x.description
      );
      console.log(bikeInfo);
      bikeInfo.length > 25 ? bikeInfo.forEach(renderer) : (distance = 200);
      fetch(
        `https://bikeindex.org:443/api/v3/search?page=1&per_page=100&query=image&location=${zipCode}&distance=${distance}&stolenness=proximity`
      )
        .then((response) => response.json())
        .then((stolenBikes) => {
          //   console.log(stolenBikes);
          bikeInfo = stolenBikes.bikes.filter(
            (x) => x.large_img && x.title && x.description
          );
          console.log(bikeInfo);
          bikeInfo.forEach(renderer);
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
    sortedData.forEach(sortedrenderer);
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
    sortedData.forEach(sortedrenderer);
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
    sortedData.forEach(sortedrenderer);
  }
}

document.querySelector("select").addEventListener("change", (e) => {
  gallery.innerHTML = "";
  const date = "date_stolen";
  const brand = "manufacturer_name";
  const location = "stolen_location";

  if (e.target.value == "Date") {
    console.log("DATE");
    filterDateStolen(bikeInfo, date);
  }
  if (e.target.value == "Location") {
    console.log("location");
    filterDateStolen(bikeInfo, location);
  } else if (e.target.value == "Manufacturer") {
    console.log("manufacturer");
    filterDateStolen(bikeInfo, brand);
  }
});

httpGetAsync(url, getZipCode);
