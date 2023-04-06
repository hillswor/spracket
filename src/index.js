let apiKey = "34eac09b0f8348b3912237e3325d9bd4";
const url = `https://ipgeolocation.abstractapi.com/v1/?api_key=${apiKey}`;
const gallery = document.querySelector(".gallery");
const navDropdown = document.querySelector("#search");
const navDropdown2 = document.querySelector("#search2");
let distance = 50;
let bikes;
let zipCode;

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
  // gallery.innerHTML = "";
  let imageOpacity = true;

  const stolenLocation = document.createElement("p");
  stolenLocation.setAttribute("id", "bike-name");
  stolenLocation.textContent = getCityAndState(bike);
  const card = document.createElement("div");
  card.setAttribute("class", "card");
  const img = document.createElement("img");
  img.setAttribute("src", bike.large_img);
  const location = document.createElement("p");
  location.textContent = getCityAndState(bike);

  img.addEventListener("click", (e) => {
    imageOpacity = !imageOpacity;

    e.preventDefault();
    if (!imageOpacity) {
      const reportButton = document.createElement("button");
      reportButton.innerText = "REPORT SIGHTING";
      reportButton.setAttribute("id", "report");

      const description = document.createElement("p");
      description.textContent = bike.title;
      const serialNumber = document.createElement("p");
      const serialNumberString = `Serial Number: ${bike.serial}`;
      serialNumber.textContent = serialNumberString;
      const dateStolen = document.createElement("p");
      dateStolen.textContent = getDateStolen(bike);
      const location = document.createElement("p");
      location.textContent = getCityAndState(bike);
      e.target.style.opacity = 0.15;
      imageOpacity = false;
      // card.appendChild(location);
      card.appendChild(reportButton);
      card.appendChild(serialNumber);
      card.appendChild(dateStolen);
      card.appendChild(description);

      reportButton.addEventListener("click", (e) => {
        console.log("clicked");
        card.innerHTML = "";
        const returnButton = document.createElement("button");
        returnButton.innerText = "RETURN";
        returnButton.className = "back-btn";
        const reportFormSubmit = document.createElement("button");
        reportFormSubmit.setAttribute = ("type", "submit");
        reportFormSubmit.setAttribute = ("value", "submit");
        reportFormSubmit.innerText = "SUBMIT";
        reportFormSubmit.className = "btn";
        const reportForm = document.createElement("form");
        reportForm.id = "report-form";
        const reportFormLocation = document.createElement("input");
        reportFormLocation.type = "text";
        reportFormLocation.className = "field";
        reportFormLocation.id = "report_form_location";
        reportFormLocation.placeholder = "   ENTER SIGHTING LOCATION";
        const reportFormComments = document.createElement("input");
        reportFormComments.type = "text";
        reportFormComments.className = "field";
        reportFormComments.id = "report_form_comments";
        reportFormComments.className = "field";
        reportFormComments.placeholder = "   ADDITIONAL COMMENTS";
        const reportFormName = document.createElement("input");
        reportFormName.type = "text";
        reportFormName.id = "report_form_name";
        reportFormName.className = "field";
        reportFormName.placeholder = "   NAME (optional)";
        const bikeDetails = document.createElement("button");
        bikeDetails.textContent = "BIKE DETAILS";
        bikeDetails.className = "btn";
        const location = document.createElement("p");
        // location.setAttribute("")
        location.textContent = getCityAndState(bike);
        location.className = "location";
        // card.appendChild(location);
        card.appendChild(reportForm);
        reportForm.appendChild(reportFormLocation);
        reportForm.appendChild(reportFormComments);
        reportForm.appendChild(reportFormName);
        reportForm.appendChild(reportFormSubmit);
        reportForm.appendChild(returnButton);
        returnButton.addEventListener("click", (e) => {
          card.innerHTML = "";
          img.style.opacity = 1;
          card.appendChild(img);
          card.appendChild(stolenLocation);
        });

        reportForm.addEventListener("submit", (e) => {
          e.preventDefault();
          const fll = report_form_location.value;
          const flc = report_form_comments.value;
          const fln = report_form_name.value;
          alert("Submission successful. Thank you.");
          card.innerHTML = "";
          img.style.opacity = 1;
          card.appendChild(img);
          card.appendChild(stolenLocation);
          createSightingObj(bike, fll, flc, fln);
        });
      });
    } else {
      card.innerHTML = "";
      e.target.style.opacity = 1;
      card.appendChild(img);
      card.appendChild(stolenLocation);
      imageOpacity = true;
    }
  });

  card.appendChild(img);
  card.appendChild(stolenLocation);
  gallery.appendChild(card);
}

function createSightingObj(bike, fll, flc, fln) {
  const formObj = {
    sighting_location: `${fll}`,
    sighting_comments: `${flc}`,
    sighting_name: `${fln}`,
  };
  sightingObj = { ...formObj, ...bike };
  postNewSighting(sightingObj);
}

function postNewSighting(sightingObj) {
  console.log(sightingObj);
  fetch(sightings_url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(sightingObj),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
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

function renderSortedBikes(bike) {
  let imageOpacity = true;
  const reportButton = document.createElement("button");
  reportButton.innerText = "REPORT SIGHTING";
  reportButton.setAttribute("id", "report");

  const stolenLocation = document.createElement("p");
  stolenLocation.setAttribute("id", "bike-name");
  stolenLocation.textContent = getCityAndState(bike);
  const card = document.createElement("div");
  card.setAttribute("class", "card");
  const img = document.createElement("img");
  img.setAttribute("src", bike.large_img);
  const location = document.createElement("p");
  location.textContent = getCityAndState(bike);

  img.addEventListener("click", (e) => {
    imageOpacity = !imageOpacity;

    e.preventDefault();
    if (!imageOpacity) {
      const description = document.createElement("p");
      description.textContent = bike.title;
      const serialNumber = document.createElement("p");
      const serialNumberString = `Serial Number: ${bike.serial}`;
      serialNumber.textContent = serialNumberString;
      const dateStolen = document.createElement("p");
      dateStolen.textContent = getDateStolen(bike);
      e.target.style.opacity = 0.25;
      card.appendChild(reportButton);

      card.appendChild(serialNumber);
      card.appendChild(dateStolen);
      card.appendChild(description);

      imageOpacity = false;

      reportButton.addEventListener("click", (e) => {
        console.log("clicked");
        card.innerHTML = "";
        const returnButton = document.createElement("button");
        returnButton.innerText = "RETURN";
        returnButton.className = "back-btn";
        const reportFormSubmit = document.createElement("button");
        reportFormSubmit.setAttribute = ("type", "submit");
        reportFormSubmit.setAttribute = ("value", "submit");
        reportFormSubmit.innerText = "SUBMIT";
        reportFormSubmit.className = "btn";
        const reportForm = document.createElement("form");
        reportForm.id = "report-form";
        const reportFormLocation = document.createElement("input");
        reportFormLocation.type = "text";
        reportFormLocation.className = "field";
        reportFormLocation.id = "report_form_location";
        reportFormLocation.placeholder = "   ENTER SIGHTING LOCATION";
        const reportFormComments = document.createElement("input");
        reportFormComments.type = "text";
        reportFormComments.className = "field";
        reportFormComments.id = "report_form_comments";
        reportFormComments.className = "field";
        reportFormComments.placeholder = "   ADDITIONAL COMMENTS";
        const reportFormName = document.createElement("input");
        reportFormName.type = "text";
        reportFormName.id = "report_form_name";
        reportFormName.className = "field";
        reportFormName.placeholder = "   NAME (optional)";
        const bikeDetails = document.createElement("button");
        bikeDetails.textContent = "BIKE DETAILS";
        bikeDetails.className = "btn";
        const location = document.createElement("p");
        // location.setAttribute("")
        location.textContent = getCityAndState(bike);
        location.className = "location";
        // card.appendChild(location);
        card.appendChild(reportForm);
        reportForm.appendChild(returnButton);
        reportForm.appendChild(reportFormLocation);
        reportForm.appendChild(reportFormComments);
        reportForm.appendChild(reportFormName);
        reportForm.appendChild(reportFormSubmit);

        returnButton.addEventListener("click", (e) => {
          card.innerHTML = "";
          img.style.opacity = 1;
          card.appendChild(img);
          card.appendChild(stolenLocation);
        });

        reportForm.addEventListener("submit", (e) => {
          e.preventDefault();
          const fll = report_form_location.value;
          const flc = report_form_comments.value;
          const fln = report_form_name.value;
          alert("Submission successful. Thank you.");
          card.innerHTML = "";
          img.style.opacity = 1;
          card.appendChild(img);
          card.appendChild(stolenLocation);
          createSightingObj(bike, fll, flc, fln);
        });
      });
    } else {
      card.innerHTML = "";
      card.appendChild(img);
      card.appendChild(stolenLocation);
      e.target.style.opacity = 1;
      imageOpacity = true;
    }
  });

  card.appendChild(img), card.appendChild(stolenLocation);
  gallery.appendChild(card);
}

function initialize(response) {
  locationObject = JSON.parse(response);
  zipCode = locationObject.postal_code;

  fetch(
    `https://bikeindex.org:443/api/v3/search?page=1&per_page=50&query=image&location=${zipCode}&distance=50&stolenness=proximity`
  )
    .then((response) => response.json())
    .then((stolenBikes) => {
      bikes = stolenBikes.bikes.filter(
        (x) => x.large_img && x.title && x.description
      );
      console.log(bikes);

      bikes.length > 25
        ? bikes.forEach((bike) => renderDisplayCardsOnPageLoad(bike))
        : (distance = 100);
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
      if (x < y) {
        return 1;
      }
      if (x > y) {
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
  e.preventDefault();

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

navDropdown2.addEventListener("change", (e) => {
  e.preventDefault();

  gallery.innerHTML = "";

  if (e.target.value == 10) {
    console.log("HEY!");
    distance = e.target.value;
    extendSearchRadius();
  }

  if (e.target.value == 100) {
    console.log("HEY!");
    distance = e.target.value;
    extendSearchRadius();
  }
  if (e.target.value == 200) {
    console.log("YO");
    distance = e.target.value;
    extendSearchRadius();
  } else if (e.target.value == 500) {
    console.log("BIG 500");
    distance = e.target.value;
    extendSearchRadius();
  }
});

const extendSearchRadius = () => {
  fetch(
    `https://bikeindex.org:443/api/v3/search?page=1&per_page=100&query=image&location=${zipCode}&distance=${distance}&stolenness=proximity`
  )
    .then((response) => response.json())
    .then((stolenBikes) => {
      bikes = stolenBikes.bikes.filter(
        (x) => x.large_img && x.title && x.description
      );
      console.log(bikes);
      bikes.forEach((bike) => renderDisplayCardsOnPageLoad(bike));
    });
};

httpGetAsync(url, initialize);
