// function for search button for onclick
const searchButton = () => {
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  const error = document.getElementById("wrong-input");
  //clear data
  searchField.value = "";
  //check search data empty or not
  if (searchText == "") {
    error.innerText = "Type something before you search";
  }
  //   //load data
  else {
    error.innerText = "";
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    fetch(url)
      .then((res) => res.json())
      .then((ret) => displaySearhchResult(ret.data));
  }
};
// show data
const displaySearhchResult = (data) => {
  const searchResult = document.getElementById("search-result");
  searchResult.innerHTML = "";
  const detailsAll = document.getElementById("phone-details");
  detailsAll.textContent = "";
  const errorSearch = document.getElementById("wrong-input");
  if (data.length == 0) {
    errorSearch.innerText = "Enter valid search";
  } else {
    errorSearch.innerText = "";
    // slice for getting 20 search result
    data.slice(0, 20).forEach((datas) => {
      const div = document.createElement("div");
      div.classList.add("col");
      div.innerHTML = `
              <div class="container-fluid card card-color">
              <div class="d-flext">
              <div class="d-flext justify-content-center">
              <img src="${datas.image}" class="image-custom card-img-top mt-2" alt="..." />
              </div>
              <div>
                  <p></p>
              </div>
          </div>   
              
                    <div class="card-body">
                      <h4 class="card-title">${datas.phone_name}</h4>
                      <hr>
                      <h5 class="text-center text-secondary">Brand name:<span class="px-2 text-primary">${datas.brand}</span></h5>
                      <hr>
                      <button onclick="detailsButton('${datas.slug}', '${datas.image}')" class="btn btn-outline-success mx-2 justify-content-center">Details</button>
                    </div>
                  </div>
              `;

      searchResult.appendChild(div);
    });
  }
};

//details button
const detailsButton = (ID) => {
  const url = `https://openapi.programming-hero.com/api/phone/${ID}`;
  fetch(url)
    .then((res) => res.json())
    .then((ret) => showDetails(ret.data, ret.data.image, ret.data.name));
};
// function after clicking details button
const showDetails = (details, pic, name) => {
  const detailsAll = document.getElementById("phone-details");
  detailsAll.textContent = "";
  const div = document.createElement("div");
  div.classList.add("card");
  let date = details.releaseDate;
  const other = details.others;
  const noDate = document.getElementById("no-date");
  if (date == "") {
    date = "No date found";
    //if there is no date
  }
  div.innerHTML = `
  <div class="d-flex container-fluid">
  <div>
  <img src="${pic}" class="card-img-top mt-2 mt-md-4" alt="..." />
  </div>
  <div class="mx-auto ms-3 ms-md-4 w-50">
  <h4 class="text-center text-success"> Features</h4>
    <h6>Storage: <span class="text-secondary">${details.mainFeatures.storage}</span></h6>
    <h6>Display size: <span class="text-secondary">${details.mainFeatures.displaySize}</span></h6>
    <h6>Chipset: <span class="text-secondary">${details.mainFeatures.chipSet}</span></h6>
    <h6>Memory: <span class="text-secondary">${details.mainFeatures.memory}</span></h6>
    <h6>Sensors: <span class="text-secondary">${details.mainFeatures.sensors}</span></h6>
    <h5>Others:</h5>
    <span>
    <small class="text-secondary">WLAN: ${other?.WLAN}</small>
    <br>
    <small class="text-secondary">Bluetooth: ${other?.Bluetooth}</small>
    <br>
    <small class="text-secondary">GPS: ${other?.GPS}</small>
    <br>
    <small class="text-secondary">NFC: ${other?.NFC}</small>
    <br>
    <small class="text-secondary">USB: ${other?.USB}</small>
    <br>
    <small class="text-secondary">Display port: ${other?.DisplayPort}</small>
  </span>
  </div>
</div>
  <hr>
        <div class="card-body">
          <h4 class="card-title text-center  text-primary">${name}</h4>
          <small class="text-center mt-2">Release Date:  <span class="text-secondary">${date}</span></small>
        </div>
    `;

  detailsAll.appendChild(div);
};
