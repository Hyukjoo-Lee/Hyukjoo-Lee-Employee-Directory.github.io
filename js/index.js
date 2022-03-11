setSearchMarkup();

$.ajax({
  url: "https://randomuser.me/api/?results=12&nat=us",
  dataType: "json",
  success: function (data) {
    formattingImgCard(data.results);
  },
});

function setSearchMarkup() {
  const searchInputMarkup = `<form action="#" method="get">
                              <input type="search" id="search-input" class="search-input" placeholder="Search...">
                              <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
                              </form>`;

  // Append search input to `search-container` div
  document
    .querySelector(".search-container")
    .insertAdjacentHTML("beforeend", searchInputMarkup);
}

// To format the html templates
function formattingImgCard(employee) {
  // Cards arr that stores each employee's card
  const cards = [];

  // Operate a function for every elements in 'employee' array
  // AND THEN following results will be stored in a new array: cards
  employee.map((employee) => {
    const img = employee.picture.large;
    const firstName = employee.name.first;
    const lastName = employee.name.last;
    const email = employee.email;
    const city = employee.location.city;
    const state = employee.location.state;

    // console.log(employee);

    const employeeCard = `<div class="card">
      <div class="card-img-container">
          <img class="card-img" src="${img}" alt="profile picture">
      </div>
      <div class="card-info-container">
          <h3 id="name" class="card-name cap">${firstName} ${lastName}</h3>
          <p class="card-text">${email}</p>
          <p class="card-text cap">${city}, ${state}</p>
      </div>
    </div>`;
    // Store HTML markups in an array; cards
    cards.push(employeeCard);
  });

  cards.forEach((card) => {
    // console.log(card);
    document.querySelector(".gallery").insertAdjacentHTML("beforeend", card);
  });

  const cardBtn = document.querySelectorAll(".card");
  // Add eventListeners for each employee' cards
  for (let i = 0; i < cardBtn.length; i++) {
    cardBtn[i].addEventListener("click", (num) => {
      if (num.target === cardBtn[i] || cardBtn[i].contains(num.target)) {
        setModals(employee, i);
      }
    });
  }
}

function setModals(employees, index) {
  // employee
  const employee = employees[index];

  // Employee Details
  const img = employee.picture.large;
  const firstName = employee.name.first;
  const lastName = employee.name.last;
  const email = employee.email;
  const street =
    employee.location.street["number"] + " " + employee.location.street["name"];
  const city = employee.location.city;
  const state = employee.location.state;
  const postcode = employee.location.postcode;
  const phoneNumber = employee.phone;
  const address = street + ", " + city + ", " + state + " " + postcode;
  const birthday = employee.dob["date"].substr(0, 10);

  const container = document.createElement("div");
  container.setAttribute("class", "modal-container");

  //   console.log(employee);
  const modal = `
            <div class="modal">
                    <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                    <div class="modal-info-container">
                        <img class="modal-img" src="${img}" alt="profile picture">
                        <h3 id="name" class="modal-name cap">${firstName} ${lastName}</h3>
                        <p id="email" class="modal-text">${email}</p>
                        <p id="city" class="modal-text cap">${city}</p>
                        <hr>
                        <p id="phoneNumber" class="modal-text">${phoneNumber}</p>
                        <p id="address" class="modal-text">${address}</p>
                        <p id="birthday" class="modal-text">Birthday: ${birthday}</p>
                    </div>
            </div>`;

  container.innerHTML = modal;
  document.body.prepend(container);

  const closeBtn = document.getElementById("modal-close-btn");
  container.addEventListener("click", (num) => {
    if (num.target === closeBtn || closeBtn.contains(num.target)) {
      document.body.removeChild(container);
    }
  });
}
