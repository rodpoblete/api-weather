var content = document.getElementById("container");
var clima = document.getElementById("clima");
var temp = document.getElementById("temperatura");
var weatherImage = document.getElementById("weather-image");
var grados = document.getElementById("grados");
var tFar = 0;

function obtenerGeo() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(coordenadas);
  } else {
    alert("Tu navegador no soporta geolocalización");
  }
}

function coordenadas(position) {
  var lat = position.coords.latitude;
  var lon = position.coords.longitude;
  var URL = `https://fcc-weather-api.glitch.me/api/current?lat=${lat}&lon=${lon}`;
  console.log(URL);
  request = new XMLHttpRequest();
  request.onreadystatechange = function() {
    if (request.readyState === 4) {
      if (request.status === 200) {
        var cuerpo = JSON.parse(request.responseText);
        tFar = cuerpo.main.temp * 1.8 + 32;
        content.innerHTML = cuerpo.name;
        clima.innerHTML = cuerpo.weather[0].main;
        temp.innerHTML = cuerpo.main.temp;
      } else {
        content.innerHTML =
          "An error occurred during your request: " +
          request.status +
          " " +
          request.statusText;
      }
    }
    var picture = `<img src="${cuerpo.weather[0].icon}" alt="icon">`;
    weatherImage.insertAdjacentHTML("beforeEnd", picture);
  };
  request.open("Get", URL);
  request.send();
}

function celciusToFar() {
  var btnCelcius = document.getElementById("celcius");
  var btnFar = document.getElementById("fahrenheit");
  temp.innerHTML = tFar;
  btnCelcius.style.display = "none";
  btnFar.style.display = "block";
}

obtenerGeo();
coordenadas();
