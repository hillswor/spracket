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
