let apiKey = "34eac09b0f8348b3912237e3325d9bd4";
const url = `https://ipgeolocation.abstractapi.com/v1/?api_key=${apiKey}`;

function httpGetAsync(url, callback) {
  const xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = function () {
    if (xmlHttp.readyState === 4 && xmlHttp.status === 200)
      callback(xmlHttp.responseText);
  };
  xmlHttp.open("GET", url, true); // true for asynchronous
  xmlHttp.send(null);
}

const card = document.querySelector(".card");
const gallery = document.querySelector(".gallery");
let bikeInfo;

const renderer = (bikeInfo) => {
  bikeInfo.forEach;
  const card = document.createElement("div");
  card.setAttribute("class", "card");
  const cardImage = document.createElement("img");
  cardImage.src = bikeInfo.large_img;
  const p1 = document.createElement("p");
  p1.setAttribute("id", "bike-name");
  p1.textContent = bikeInfo.frame_model;
  card.append(cardImage, p1);
  gallery.append(card);
};

function getZipCode(response) {
  locationObject = JSON.parse(response);
  const zipCode = locationObject.postal_code;

  fetch(
    `https://bikeindex.org:443/api/v3/search?page=1&per_page=4&query=image&location=${zipCode}&distance=50&stolenness=proximity`
  )
    .then((response) => response.json())
    .then((stolenBikes) => {
      //   console.log(stolenBikes);
      bikeInfo = stolenBikes.bikes.filter((x) => x.large_img);
      console.log(bikeInfo);
      bikeInfo.forEach(renderer);
    });
}

httpGetAsync(url, getZipCode);
