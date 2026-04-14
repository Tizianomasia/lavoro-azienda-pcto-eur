let hotels = [];
function getHotels() {

  if (currentSection !== "hotels") return;

  const xhttp = new XMLHttpRequest();
  const url = "http://localhost:8080/hotels";

  xhttp.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {

      // 🔥 controllo IMPORTANTISSIMO
      if (currentSection !== "hotels") return;

      hotels = JSON.parse(this.responseText);

      let card = "";

      for (let i = 0; i < hotels.length; i++) {

        card += '<div class="card">';
        card += '<div class="card-header">';
        card += '<h2 class="card-title">' + hotels[i].name + '</h2>';
        card += '</div>';

        card += '<div class="card-info-visible">';
        card += '<div class="card-info">📍 ' + (hotels[i].address || '') + '</div>';
        card += '<div class="card-info">📞 ' + (hotels[i].phone || '') + '</div>';
        card += '</div>';

        card += '<div class="card-content show">';
        card += '<button class="card-button" onclick="showDetail(\'' + hotels[i].id + '\')">';
        card += 'Vai al dettaglio';
        card += '</button>';
        card += '</div>';

        card += '</div>';
      }

      document.getElementById("contenitore-card").innerHTML = card;
    }
  };

  xhttp.open("GET", url);
  xhttp.send();
}

document.addEventListener("DOMContentLoaded", getHotels);

// ------------------- DETTAGLIO -------------------
window.showDetail = function (id) {

  console.log("CLICK OK:", id);

  document.getElementById("contenitore-card").style.display = "none";
  document.getElementById("contenitore-dettaglio").style.display = "block";

  let hotel = hotels.find(h => String(h.id) === String(id));

  if (!hotel) {
    console.log("Hotel non trovato");
    return;
  }

  let card = "";

  card += '<div class="card-dettaglio">';

  card += '<button onclick="goBack()">⬅ Torna indietro</button>';

  card += '<h2>' + hotel.name + '</h2>';

  let stars = "";
  for (let i = 0; i < hotel.stars; i++) {
    stars += "⭐";
  }
  card += stars;

  card += '<hr>';

  card += '<p>' + hotel.longDescription + '</p>';

  card += '<p><b>Indirizzo:</b> ' + hotel.address.streetAddress + '</p>';
  card += '<p><b>Città:</b> ' + hotel.address.city + '</p>';
  card += '<p><b>Paese:</b> ' + hotel.address.country + '</p>';
  card += '<p><b>CAP:</b> ' + hotel.address.zipCode + '</p>';

  card += '</div>';

  document.getElementById("contenitore-dettaglio").innerHTML = card;
};

// ------------------- TORNA INDIETRO -------------------
window.goBack = function () {
  document.getElementById("contenitore-dettaglio").style.display = "none";
  document.getElementById("contenitore-card").style.display = "grid";
};