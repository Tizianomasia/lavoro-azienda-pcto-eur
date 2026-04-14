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

document.getElementById("hotel").addEventListener("load", getHotels());
function ShowDetail(id) {
  alert("Hai cliccato su: " + id + " nella pagina degli hotel" );

  document.getElementById("contenitori_card").style.display = "none";
  document.getElementById("contenitore-dattaglio").style.display = "block";
  let card = "";

  for (let i = 0; i < hotels?.length; i++) {
    if (hotels[i].id === id) { 
      card += '<div class="card-dettaglio">';
      card +=
      '<button class="pulsante-card-dettaglio" onclick="goback()"><img src="../sito-fase-8/img/go-back.svg" alt=""  />torna Indietro</button>'; 
      card += "<div>";
      card += "<h2>" + hotels[i].name + "</h2>";

      let stars = "";
      for (let j = 0; j < hotels[i].stars; j++) {
        stars += "⭐";
      }
      card += stars;
      card += '<hr class="divisore-card" />';
      card += "</div>";
      card += '<div class="contenuto-card">';
      card += "<p>" + hotels[i].longDescription + "</p>";
      card += "<p><em>Indirizzo:</em> " + hotels[i].address.streetAddress + "</p>";
      card +="<p><em>Città:</em> " + hotels[i].address.city + "</p>";
      card += "<p><em>Paese:</em> " + hotels[i].address.country + "</p>";
      card += "<p><em>CAP:</em> " + hotels[i].address.ZipCode + "</p>";
      card += "</div>";
      card += "</div>";

      document.getElementById("contenitore-dettaglio").innerHTML = card;
    }
  }
}

function goBack() {
  document.getElementById("contenitori_dettaglio").style.display = "none";
  document.getElementById("contenitore-card").style.display = "flex";
}