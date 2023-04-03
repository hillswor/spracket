const url = `https://ipgeolocation.abstractapi.com/v1/?api_key=${apiKey}`;

function localStolenBikes(response) {
	locationObject = JSON.parse(response);
	const zipCode = locationObject.postal_code;
	fetch(
		`https://bikeindex.org:443/api/v3/search?page=1&per_page=25&query=image&location=${zipCode}&distance=50&stolenness=proximity`
	)
		.then((response) => response.json())
		.then((bikes) => {
			console.log(bikes);
		});
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

httpGetAsync(url, localStolenBikes);
