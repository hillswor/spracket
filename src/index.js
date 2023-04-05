let apiKey = "34eac09b0f8348b3912237e3325d9bd4";
const url = `https://ipgeolocation.abstractapi.com/v1/?api_key=${apiKey}`;
const sightings_url = "http://localhost:3000/sightings";
const gallery = document.querySelector(".gallery");
const navDropdown = document.querySelector("#search");
let distance = 50;
let bikes;

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
  bikeDetails.className = "btn"
  const reportSighting = document.createElement("button");
  reportSighting.className = "btn";
  reportSighting.textContent = "REPORT SIGHTING";
  card.appendChild(bikeDetails);
  card.appendChild(reportSighting); 
  card.appendChild(location);
  card.appendChild(img);
  gallery.appendChild(card);
  bikeDetails.addEventListener("click", (e) => {
    renderDetailsOnClick(bike, card);
  });
  reportSighting.addEventListener('click', (e) => {    
    renderReportForm(bike, card);            
  });
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
  console.log(bike);
  card.innerHTML = "";
  const viewBikeImg = document.createElement("button");
  viewBikeImg.textContent = "VIEW IMAGE";
  viewBikeImg.className = "btn"
  const description = document.createElement("p");
  description.textContent = bike.title;
  const serialNumber = document.createElement("p");
  const serialNumberString = `Serial Number: ${bike.serial}`;
  serialNumber.textContent = serialNumberString;
  const dateStolen = document.createElement("p");
  dateStolen.textContent = getDateStolen(bike);
  const reportSighting = document.createElement("button");
  reportSighting.className = "btn";
  reportSighting.textContent = "REPORT SIGHTING";  
  viewBikeImg.addEventListener("click", (e) => {
    renderImgAndTitleOnClick(bike, card);
  });
  reportSighting.addEventListener('click', (e) => {    
    renderReportForm(bike, card);            
  });
  card.appendChild(viewBikeImg);
  card.appendChild(reportSighting);
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
  bikeDetails.className = "btn"
  const reportSighting = document.createElement("button");
  reportSighting.className = "btn";
  reportSighting.textContent = "REPORT SIGHTING";  
  bikeDetails.addEventListener("click", (e) => {
    renderDetailsOnClick(bike, card);
  });
  reportSighting.addEventListener('click', (e) => {    
    renderReportForm(bike, card);            
  });
  card.appendChild(bikeDetails);
  card.appendChild(reportSighting);
  card.appendChild(location);
  card.appendChild(img);
}

function renderSortedBikes(bike) {
  const card = document.createElement("div");
  card.setAttribute("class", "card");
  const img = document.createElement("img");
  img.setAttribute("src", bike.large_img);
  const location = document.createElement("p");
  location.textContent = getCityAndState(bike);
  const bikeDetails = document.createElement("button");
  bikeDetails.textContent = "BIKE DETAILS";
  bikeDetails.className = "btn"
  const reportSighting = document.createElement("button");
  reportSighting.className = "btn";
  reportSighting.textContent = "REPORT SIGHTING";
  bikeDetails.addEventListener("click", (e) => {
    renderDetailsOnClick(bike, card);
  });
  reportSighting.addEventListener('click', (e) => {    
    renderReportForm(bike, card);            
  });
  card.appendChild(bikeDetails);
  card.appendChild(reportSighting);
  card.appendChild(location);
  card.appendChild(img);
  gallery.appendChild(card);
}

function renderReportForm(bike, card) {
  card.innerHTML = "";
  const reportFormSubmit = document.createElement("button");
  reportFormSubmit.setAttribute = ("type", "submit");
  reportFormSubmit.setAttribute = ("value", "submit");
  reportFormSubmit.innerText = "SUBMIT";
  reportFormSubmit.className = "btn";
  const reportForm = document.createElement("form");
  reportForm.id = "report-form";
  const reportFormLocation = document.createElement("input");
  reportFormLocation.type = "text";
  reportFormLocation.id = "report_form_location";
  reportFormLocation.placeholder = "ENTER SIGHTING LOCATION";
  const reportFormComments = document.createElement("input");
  reportFormComments.type = "text";
  reportFormComments.id = "report_form_comments";
  reportFormComments.placeholder = "ADDITIONAL COMMENTS";
  const reportFormName = document.createElement("input");
  reportFormName.type = "text";
  reportFormName.id = "report_form_name";
  reportFormName.placeholder = "NAME (optional)";
  const bikeDetails = document.createElement("button");
  bikeDetails.textContent = "BIKE DETAILS";
  bikeDetails.className = "btn";
  reportForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const fll = report_form_location.value;
    const flc = report_form_comments.value
    const fln = report_form_name.value
    alert("Submission successful. Thank you.");
    createSightingObj(bike, fll, flc, fln);
    renderDetailsOnClick(bike, card);
  });
  bikeDetails.addEventListener("click", (e) => {
    renderDetailsOnClick(bike, card);
  });
  card.appendChild(bikeDetails);
  card.appendChild(reportForm);
  reportForm.appendChild(reportFormLocation);
  reportForm.appendChild(reportFormComments);
  reportForm.appendChild(reportFormName);
  reportForm.appendChild(reportFormSubmit);
};

function createSightingObj(bike, fll, flc, fln) {
  const formObj = { sighting_location: `${fll}`, sighting_comments: `${flc}`, sighting_name: `${fln}`};
  sightingObj = {...formObj, ...bike};
  postNewSighting(sightingObj);
};
    
function postNewSighting(sightingObj) {
  console.log(sightingObj);
  fetch(sightings_url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body:JSON.stringify(sightingObj)
  })
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
  })
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
        : (distance = 1000);
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
      renderSortedBikes(bike);
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
      renderSortedBikes(bike);
    });
  }
  if (byKey === "stolen_location") {
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
      renderSortedBikes(bike);
    });
  }
}

navDropdown.addEventListener("change", (e) => {
  gallery.innerHTML = "";
  const date = "date_stolen";
  const brand = "manufacturer_name";
  const location = "stolen_location";

  if (e.target.value == "Date") {
    filterDateStolen(bikes, date);
  }
  if (e.target.value == "Location") {
    filterDateStolen(bikes, location);
  } else if (e.target.value == "Manufacturer") {
    filterDateStolen(bikes, brand);
  }
});

httpGetAsync(url, initialize);