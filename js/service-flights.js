let flights = [];

function getFlights() {
    
  const xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      flights = JSON.parse(this.responseText);
      let card = "";

      for (let i = 0; i < flights.length; i++) {
        card += '<div class="card flight-card">';

        card += '<div class="flight-header">✈️ Volo Economy</div>';

        card += '<div class="flight-route">';
        card += '<div class="city"><strong>' + flights[i].origin + '</strong><br></div>';
        card += '<div class="arrow">➡️</div>';
        card += '<div class="city"><strong>' + flights[i].destination + '</strong><br></div>';
        card += '</div>';

        card += '<div class="flight-info">';
        card += '✈️ ' + (flights[i].airline || '') + '<br>';
        card += '📅 Partenza: ' + (flights[i].departureTime || '') + '<br>';
        card += '📅 Arrivo: ' + (flights[i].arrivalTime || '') + '<br>';
        card += '</div>';

        card += '<div class="flight-price">💶 ' + (flights[i].price || '') + '€</div>';

        card += '<button class="card-button" onclick="showFlightDetail(\'' + flights[i].id + '\')">';
        card += 'Prenota Volo';
        card += '</button>';

        card += '</div>';
      }

      document.getElementById("contenitore-card").innerHTML = card;
    }
  };

  xhttp.open("GET", "http://localhost:8080/flights");
  xhttp.send();
}