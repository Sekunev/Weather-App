const input = document.querySelector("input");
const button = document.querySelector("button");
const myCard = document.querySelector(".card");

let isError = false;

//* api'den veri çekmek için
const getWeather = async (cityName) => {
  const key = "6e1a3eda9fa53b82169bd49471c74f36";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${key}&units=metric&lang=tr`;
  try {
    const res = await fetch(url);
    console.log(res);
    if (!res.ok) {
      isError = true;
      // throw new Error(`Something went wrong. Failure Code :${res.status}`);
    }
    const data = await res.json();

    console.log(data);
    renderWeather(data);
  } catch (error) {
    // console.log(error);
  }
};
let listElementCounter = 0;
//* değerleri yazdırmak için
const renderWeather = (item) => {
  const weatherListDiv = document.querySelector(".container");
  if (isError) {
    // listElementCounter -= 1;
    weatherListDiv.innerHTML = `<h2>The city name is incorrect. Please check and login again.</h2>
      <img
      src="https://cdn.pixabay.com/photo/2014/03/25/16/27/attention-297169_960_720.png"
      alt=""
      class="w-25 mx-auto"
    />
  `;
    listElementCounter = 0;
    cities = [];
    console.log(listElementCounter);
    isError = false;

    setTimeout(() => {
      weatherListDiv.innerHTML = "";
    }, 1500);
  }
  console.log(item);
  const {
    name,
    main,
    weather,
    wind,
    sys,
    coord: { lon, lat },
  } = item;
  console.log(item);
  console.log(lon, lat);

  weatherListDiv.innerHTML += `    
  <div class="card col-sm-6 col-md-4 col-lg-3" style="width: 15rem">
        <p class="list-group-item">${name.replace(
          "Province",
          ""
        )}<sup class="sub">${sys.country}</sup>
        <p class="list-group-item">${Math.round(main.temp)}<sup>°C</sup></p>
        <img src="http://openweathermap.org/img/w/${
          weather[0].icon
        }.png" class="card-img-top alt="icon" />
        <p class="list-group-item fw-normal fs-6">${weather[0].description.toUpperCase()}</p>
        <p class="list-group-item temp_min-max">${Math.round(
          main.temp_min
        )} / ${Math.round(main.temp_max)}°C</p>
        <p class="list-group-item temp_min-max">${Math.round(wind.speed)}m/s</p>
        <button class="btn remove" type="button">Remove</button>
        <a href="https://www.google.com/maps/place/${name}" target="_blank" class=""><i class="fa-solid fa-location-dot"></i></a>
    </div>
    `;
  //! koordinata göre konum bilgisi için:
  //? bilgi: https://developers.google.com/maps/documentation/urls/get-started#map-action
  //? link https://www.google.com/maps/@?api=1&map_action=map&center=${lat} ,${lon}&zoom=12&basemap=terrain

  // card'a hava durumuna göre yeni class ataması bg'ı hava durumuna göre ayarlamak için.
  listElementCounter += 1;
  // console.log(listElementCounter);
  // console.log(item);
  // console.log(weather);
  const classNew = weather[0].main;
  const lastChild = row.lastElementChild;
  lastChild.classList.add(`${classNew}`);
  // console.log(weather[0].main);
  // console.log(lastChild);
};

let cities = [];

const aciklama = document.querySelector(".newsList");
//* buton click
button.addEventListener("click", () => {
  if (cities.includes(input.value.toLowerCase())) {
    aciklama.innerHTML = `<h2>You already know the weather in ${input.value.toLowerCase()}</h2>`;
    setTimeout(() => {
      aciklama.innerHTML = "";
    }, 1500);
  }
  if (listElementCounter <= 3) {
    if (listElementCounter == 3) {
      cities.shift();
      listElementCounter--;
      row.querySelector(".card").remove();
    }
    if (!cities.includes(input.value.toLowerCase())) {
      cities.push(input.value.toLowerCase());
      getWeather(input.value);
      // aciklama.innerHTML = "<h2> </h2>";
    }
  }

  input.value = "";
});

//* enter tuşu aktif olması için
input.addEventListener("keydown", (e) => {
  e.key === "Enter" && button.click();
});

//* focus olması için
window.addEventListener("load", () => {
  input.focus();
});

let row = document.querySelector(".row");

//* remove tıklanınca card'ın silinmesi
row.addEventListener("click", (e) => {
  if (e.target.innerText == "Remove") {
    e.target.parentElement.remove();
  }
  cities = cities.filter(
    (item) =>
      item !== e.target.parentElement.firstElementChild.innerText.toLowerCase()
  );
});
