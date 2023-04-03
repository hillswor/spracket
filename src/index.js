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
