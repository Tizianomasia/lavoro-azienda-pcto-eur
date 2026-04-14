

document.addEventListener("DOMContentLoaded", getHotels);

function renderHotels() {
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