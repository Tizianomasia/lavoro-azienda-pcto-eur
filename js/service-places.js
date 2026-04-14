let places = [];

function getPlaces() {
  const xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      places = JSON.parse(this.responseText);
      let card = "";
      for (let i = 0; i < places.length; i++) {
        card += '<div class="card">';
        card += '<div class="card-header">';
        card += '<h2 class="card-title">' + places[i].name + '</h2>';
        card += '</div>';
        card += '<div class="card-info-visible">';
        card += '<div class="card-info">📍 ' + (places[i].city || '') + '</div>';
        card += '<div class="card-info">🏛️ ' + (places[i].category || '') + '</div>';
        card += '</div>';
        card += '<div class="card-content show">';
        card += '<button class="card-button" onclick="showPlaceDetail(\'' + places[i].id + '\')">';
        card += 'Vai al dettaglio';
        card += '</button>';
        card += '</div>';
        card += '</div>';
      }
      document.getElementById("contenitore-card").innerHTML = card;
    }
  };
  xhttp.open("GET", "http://localhost:8080/places");
  xhttp.send();
}

window.showPlaceDetail = function(id) {
  document.getElementById("contenitore-card").style.display = "none";
  document.getElementById("contenitore-dettaglio").style.display = "block";

  let p = places.find(x => String(x.id) === String(id));
  if (!p) return;

  let card = '<div class="card-dettaglio">';
  card += '<button onclick="goBack()">⬅ Torna indietro</button>';
  card += '<h2>' + p.name + '</h2>';
  card += '<hr>';
  card += '<p>' + (p.longDescription || '') + '</p>';
  card += '<p><b>Città:</b> ' + (p.city || '') + '</p>';
  card += '<p><b>Categoria:</b> ' + (p.category || '') + '</p>';
  card += '</div>';

  document.getElementById("contenitore-dettaglio").innerHTML = card;
};