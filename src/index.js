let zipCode;

const url = `https://ipgeolocation.abstractapi.com/v1/?api_key=${apiKey}`;

function getZipCode(response) {
	locationObject = JSON.parse(response);
	zipCode = locationObject.postal_code;
}

function httpGetAsync(url, callback) {
	const xmlHttp = new XMLHttpRequest();
	xmlHttp.onreadystatechange = function () {
		if (xmlHttp.readyState === 4 && xmlHttp.status === 200)
			callback(xmlHttp.responseText);
	};
	xmlHttp.open("GET", url, true); // true for asynchronous
	xmlHttp.send(null);
}

httpGetAsync(url, getZipCode);

const card = document.querySelector(".card");

let zipcode = 97239;
let bikeInfo;

fetch(
  `https://bikeindex.org:443/api/v3/search?page=1&per_page=25&query=image&location=${zipcode}&distance=50&stolenness=proximity`
)
  .then((response) => response.json())
  .then((bikes) => {
    console.log(bikes);
    bikeInfo = bikes;
    const cardImage = document.createElement("img");
    cardImage.src = bikeInfo.bikes[0].large_img;
    card.append(cardImage);
    // console.log(bikeInfo.bikes);
    // console.log(bikeInfo.bikes.filter((x) => x.large_img));
  });

