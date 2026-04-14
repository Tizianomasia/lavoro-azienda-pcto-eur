let currentSection = "hotels";

// ------------------- SWITCH SEZIONI -------------------
function setSection(section) {

  currentSection = section;

  // reset UI
  document.getElementById("contenitore-card").innerHTML = "";
  document.getElementById("contenitore-card").style.display = "grid";

  document.getElementById("contenitore-dettaglio").style.display = "none";

  // CHIAMATA CORRETTA
  if (section === "hotels") {
    getHotels();
  }

  if (section === "restaurants") {
    getRestaurants();
  }

  if (section === "flights") {
    document.getElementById("contenitore-card").innerHTML =
      "<h2>Sezione voli in arrivo ✈️</h2>";
  }

  if (section === "places") {
    document.getElementById("contenitore-card").innerHTML =
      "<h2>Sezione luoghi in arrivo 📍</h2>";
  }
}

// ------------------- INIT -------------------
document.addEventListener("DOMContentLoaded", () => {
  setSection("hotels");
});


/*let currentData = [];
let renderFunction = null;

// 🔥 collega dati + render
function setData(data, renderFn) {
  currentData = data;
  renderFunction = renderFn;
  applyFilters();
}
function applyFilters() {
  if (!renderFunction) return;

  const q = document.getElementById("searchInput")?.value?.toLowerCase().trim() || "";

  let filtered = [...currentData];

  // SEARCH
  if (q) {
    filtered = filtered.filter(item =>
      item.name.toLowerCase().includes(q) ||
      (item.address && item.address.toLowerCase().includes(q))
    );
  }

  // SORT / FILTER
  const selected = document.querySelector('input[name="sort"]:checked');
  const value = selected ? selected.value : null;

  if (value === "asc") {
    filtered.sort((a,b) => (a.price||0)-(b.price||0));
  }

  if (value === "desc") {
    filtered.sort((a,b) => (b.price||0)-(a.price||0));
  }

  if (value === "budget1") {
    filtered = filtered.filter(h => (h.price || 0) <= 50);
  }

  if (value === "budget2") {
    filtered = filtered.filter(h => (h.price || 0) <= 150);
  }

  if (value === "budget3") {
    filtered = filtered.filter(h => (h.price || 0) > 150);
  }

  // RENDER
  renderFunction(filtered);

  // COUNTER
  const counter = document.getElementById("resultsCount");
  if (counter) {
    counter.textContent = filtered.length + " risultati";
  }
}

/* EVENTI (UNA SOLA VOLTA)
document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("searchInput").addEventListener("input", applyFilters);
  document.getElementById("applyBtn").addEventListener("click", applyFilters);
});

    // ALBUM
    function apriAlbum() {
        section.style.display = 'none';
        searchBar.style.display = 'none';
        albumPanel.classList.add('show');
    }

    function chiudiAlbum() {
        section.style.display = '';
        searchBar.style.display = '';
        albumPanel.classList.remove('show');
    }

    albumHoverBtn.addEventListener('click', apriAlbum);
    albumPanelClose.addEventListener('click', chiudiAlbum);
    albumPanelOk.addEventListener('click', chiudiAlbum);

    // CONTATTI hover
    const contattiWrap = document.querySelector('.contatti-wrap');
    const contattiInfo = document.querySelector('.contatti-info');

    contattiWrap.addEventListener('mouseenter', function() {
        contattiInfo.style.display = 'block';
    });

    contattiWrap.addEventListener('mouseleave', function() {
        contattiInfo.style.display = 'none';
    });

});*/
