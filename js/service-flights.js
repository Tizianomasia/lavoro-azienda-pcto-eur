function renderCards(list) {
  let card = "";

  for (let i = 0; i < list.length; i++) {
    card += `
    <div class="card" id="flightCard-${i}" onclick="ShowDetail(${i})">

        <div class="image-container">
            <img src="./flight.png" class="card-image">
            <div class="rating-stars">⭐⭐⭐⭐</div>
        </div>

        <div class="card-header">
            <h2 class="card-title">${list[i].name}</h2>
        </div>

        <div class="card-info-visible">
            <div class="card-info">
                ✈️ Partenza: ${list[i].departure || 'Non disponibile'}
            </div>

            <div class="card-info">
                🛬 Arrivo: ${list[i].arrival || 'Non disponibile'}
            </div>

            <div class="card-info">
                📍 Aeroporto: ${list[i].airport || 'Non disponibile'}
            </div>
        </div>

        <div class="card-content">
            <div class="card-rating">
                💬 ${list[i].rating || 'N/A'}/10
            </div>

            <p class="card-description">
                ${list[i].description || 'Descrizione non disponibile'}
            </p>

            <button class="card-button"
                onclick="event.stopPropagation(); oneclick('${list[i].name}')">
                Prenota Volo
            </button>
        </div>

    </div>
    `;
  }

  document.getElementById("contenitore-card").innerHTML = card;
}

function getFlights() {
  const xhttp = new XMLHttpRequest();
  const url = "http://localhost:8080/flights";

  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      const flights = JSON.parse(this.responseText);

      // 🔥 collega ai filtri
      setData(flights, renderCards);
    }
  };

  xhttp.open("GET", url);
  xhttp.send();
}

document.addEventListener("DOMContentLoaded", getFlights);