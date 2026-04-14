window.setSection = function(section) {
  currentSection = section;

  document.getElementById("contenitore-dettaglio").style.display = "none";
  document.getElementById("contenitore-card").style.display = "grid";

  document.getElementById("contenitore-card").innerHTML = ""; // 🔥 pulisci sempre

  if (section === "hotels") {
    getHotels();
  }

  if (section === "restaurants") {
    loadRestaurants();
  }
};

function openImage(event) {
    event.preventDefault();
    document.getElementById("imm").classList.add("show");
}

function closeImage(event) {
    if (event.target.id === "imm") {
        document.getElementById("imm").classList.remove("show");
    }
}

// apertura menu
function toggleImpostazioni() {
    const menu = document.getElementById("impMenu");
    menu.classList.toggle("show");
}

// aspetta caricamento pagina
document.addEventListener("DOMContentLoaded", function () {

    const radioTema = document.querySelectorAll('input[name="tema"]');

    radioTema.forEach(radio => {
        radio.addEventListener("change", function () {

            if (this.value === "scuro") {
                document.body.classList.add("dark");
            } else {
                document.body.classList.remove("dark");
            }

        });
    });

});

document.addEventListener("DOMContentLoaded", function () {

    // CAMBIO TEMA
    const radioTema = document.querySelectorAll('input[name="tema"]');

    radioTema.forEach(radio => {
        radio.addEventListener("change", function () {
            if (this.value === "scuro") {
                document.body.classList.add("dark");
            } else {
                document.body.classList.remove("dark");
            }
        });
    });

});

document.addEventListener("DOMContentLoaded", function () {

    const input = document.getElementById("searchInput");

    input.addEventListener("keyup", function () {

        const value = input.value.toLowerCase();

        const cards = document.querySelectorAll(".card"); // 🔥 aggiornato qui

        cards.forEach(card => {
            const text = card.innerText.toLowerCase();
            card.style.display = text.includes(value) ? "block" : "none";
        });

    });

});