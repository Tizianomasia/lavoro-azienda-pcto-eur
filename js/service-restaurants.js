let restaurants = [];

function getRestaurants() {
  const xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      restaurants = JSON.parse(this.responseText);
      let card = "";
      for (let i = 0; i < restaurants.length; i++) {
        card += '<div class="card">';
        card += '<div class="card-header">';
        card += '<h2 class="card-title">' + restaurants[i].name + '</h2>';
        card += '</div>';
        card += '<div class="card-info-visible">';
        card += '<div class="card-info">📍 ' + (restaurants[i].address || '') + '</div>';
        card += '<div class="card-info">🍽️ ' + (restaurants[i].cuisine || '') + '</div>';
        card += '</div>';
        card += '<div class="card-content show">';
        card += '<button class="card-button" onclick="showRestaurantDetail(\'' + restaurants[i].id + '\')">';
        card += 'Vai al dettaglio';
        card += '</button>';
        card += '</div>';
        card += '</div>';
      }
      document.getElementById("contenitore-card").innerHTML = card;
    }
  };
  xhttp.open("GET", "http://localhost:8080/restaurants");
  xhttp.send();
}

window.showRestaurantDetail = function(id) {
  document.getElementById("contenitore-card").style.display = "none";
  document.getElementById("contenitore-dettaglio").style.display = "block";

  let r = restaurants.find(x => String(x.id) === String(id));
  if (!r) return;

  let card = '<div class="card-dettaglio">';
  card += '<button onclick="goBack()">⬅ Torna indietro</button>';
  card += '<h2>' + r.name + '</h2>';
  card += '<hr>';
  card += '<p>' + (r.longDescription || '') + '</p>';
  card += '<p><b>Cucina:</b> ' + (r.cuisine || '') + '</p>';
  card += '<p><b>Indirizzo:</b> ' + (r.address || '') + '</p>';
  card += '</div>';

  document.getElementById("contenitore-dettaglio").innerHTML = card;
};