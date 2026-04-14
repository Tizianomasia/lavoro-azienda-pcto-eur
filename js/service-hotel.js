function getHotels() {
  const xhttp = new XMLHttpRequest();
  const url = "http://localhost:8080/hotels";

  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      const hotels = JSON.parse(this.responseText);
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
        card += '<button class="card-button" onclick="oneclick(\'' + hotels[i].name + '\')">Vai al dettaglio</button>';
        card += '</div>';
        card += '</div>';
      }

      document.getElementById("contenitore-card").innerHTML = card;
    }
  }

  xhttp.open("GET", url);
  xhttp.send();
}

document.addEventListener("DOMContentLoaded", getHotels);

function oneclick(name) {
  alert("Hai cliccato su: " + name);
}