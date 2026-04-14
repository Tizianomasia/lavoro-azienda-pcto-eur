function getHotels() {
  const xhttp = new XMLHttpRequest();
  const url = "http://localhost:8080/hotels";

  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      const hotels = JSON.parse(this.responseText);
      let card = "";

      for (let i = 0; i < hotels.length; i++) {
        card += `
        <div class="card" id="hotelCard-${i}" onclick="ShowDetail(${i})">

            <div class="image-container">
                <img src="./Screenshot 2026-04-13 172119.png" class="card-image">
                <div class="stelle">⭐⭐⭐⭐</div>
            </div>

            <div class="card-header">
                <h2 class="card-title">${hotels[i].name}</h2>
            </div>

            <div class="card-info-visible">
                <div class="card-info">
                    📞 ${hotels[i].phone || ''}
                </div>

                <div class="card-info">
                    📍 ${hotels[i].address || ''}
                </div>
            </div>

            <div class="card-content" id="cardDetails-${i}">
                <div class="card-rating">
                    💬 ${hotels[i].rating || 'N/A'}/10
                </div>

                <p class="card-description">
                    ${hotels[i].description || 'Descrizione non disponibile'}
                </p>

                <button class="card-button" onclick="event.stopPropagation(); oneclick('${hotels[i].name}')">
                    Prenota Ora
                </button>
            </div>

        </div>
        `;
      }

      document.getElementById("contenitore-card").innerHTML = card;
    }
  };

  xhttp.open("GET", url);
  xhttp.send();
}

document.addEventListener("DOMContentLoaded", getHotels);

function getHotels() {
  const xhttp = new XMLHttpRequest();
  const url = "http://localhost:8080/hotels";

  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      const hotels = JSON.parse(this.responseText);

      // 🔥 collegamento al sistema filtri
      setData(hotels, renderHotels);
    }
  };

  xhttp.open("GET", url);
  xhttp.send();
}

document.addEventListener("DOMContentLoaded", getHotels);