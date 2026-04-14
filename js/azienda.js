let currentSection = "hotels";

// Genera i suggerimenti di ricerca
function updateSuggestions() {
  const searchInput = document.getElementById("searchInput");
  const suggestionsContainer = document.getElementById("searchSuggestions");
  const query = searchInput.value.toLowerCase().trim();

  // Se la ricerca è vuota, nascondi i suggerimenti
  if (!query) {
    suggestionsContainer.classList.remove("show");
    return;
  }

  let suggestions = [];

  // Aggiungi suggerimenti per hotel
  if (typeof hotels !== "undefined" && hotels.length > 0) {
    const hotelMatches = hotels.filter(h => 
      h.name.toLowerCase().includes(query) || 
      (h.address && h.address.toLowerCase && h.address.toLowerCase().includes(query))
    );
    if (hotelMatches.length > 0) {
      suggestions.push({
        type: "hotels",
        text: `🏨 Hotel - ${query}`,
        icon: "🏨"
      });
    }
  }

  // Aggiungi suggerimenti per voli
  if (typeof flights !== "undefined" && flights.length > 0) {
    const flightMatches = flights.filter(f => 
      f.origin.toLowerCase().includes(query) || 
      f.destination.toLowerCase().includes(query)
    );
    if (flightMatches.length > 0) {
      suggestions.push({
        type: "flights",
        text: `✈️ Voli - ${query}`,
        icon: "✈️"
      });
    }
  }

  // Aggiungi suggerimenti per ristoranti
  if (typeof restaurants !== "undefined" && restaurants.length > 0) {
    const restaurantMatches = restaurants.filter(r => 
      r.name.toLowerCase().includes(query) || 
      (r.address && r.address.toLowerCase && r.address.toLowerCase().includes(query))
    );
    if (restaurantMatches.length > 0) {
      suggestions.push({
        type: "restaurants",
        text: `🍽️ Ristoranti - ${query}`,
        icon: "🍽️"
      });
    }
  }

  // Aggiungi suggerimenti per luoghi
  if (typeof places !== "undefined" && places.length > 0) {
    const placeMatches = places.filter(p => 
      p.name.toLowerCase().includes(query) || 
      (p.address && p.address.toLowerCase && p.address.toLowerCase().includes(query))
    );
    if (placeMatches.length > 0) {
      suggestions.push({
        type: "places",
        text: `📍 Luoghi - ${query}`,
        icon: "📍"
      });
    }
  }

  // Mostra i suggerimenti
  if (suggestions.length > 0) {
    suggestionsContainer.innerHTML = suggestions.map((sugg, idx) => 
      `<div class="search-suggestion-item" onclick="applySuggestion('${sugg.type}', '${query.replace(/'/g, "\\'")}')">
        <span class="search-suggestion-category">${sugg.text}</span>
      </div>`
    ).join("");
    suggestionsContainer.classList.add("show");
  } else {
    suggestionsContainer.classList.remove("show");
  }
}

// Applica il suggerimento selezionato
window.applySuggestion = function(section, query) {
  // Imposta la sezione
  window.setSection(section);

  // Imposta il valore della ricerca
  document.getElementById("searchInput").value = query;

  // Nascondi i suggerimenti
  document.getElementById("searchSuggestions").classList.remove("show");

  // Filtra i risultati in base alla query
  filterResultsByQuery(query, section);
};

// Filtra i risultati in base alla query di ricerca
function filterResultsByQuery(query, section) {
  let dataToFilter = [];
  let getRenderFunction;

  if (section === "hotels") {
    dataToFilter = hotels;
    getRenderFunction = getHotels;
  } else if (section === "flights") {
    dataToFilter = flights;
    getRenderFunction = getFlights;
  } else if (section === "restaurants") {
    dataToFilter = restaurants;
    getRenderFunction = getRestaurants;
  } else if (section === "places") {
    dataToFilter = places;
    getRenderFunction = getPlaces;
  }

  // Filtra i dati
  const filtered = dataToFilter.filter(item => {
    const itemName = item.name ? item.name.toLowerCase() : "";
    const itemAddress = item.address ? (typeof item.address === "string" ? item.address : (item.address.city || "")).toLowerCase() : "";
    const itemOrigin = item.origin ? item.origin.toLowerCase() : "";
    const itemDestination = item.destination ? item.destination.toLowerCase() : "";
    
    return itemName.includes(query.toLowerCase()) || 
           itemAddress.includes(query.toLowerCase()) ||
           itemOrigin.includes(query.toLowerCase()) ||
           itemDestination.includes(query.toLowerCase());
  });

  // Renderizza i risultati filtrati
  const container = document.getElementById("contenitore-card");
  let card = "";

  if (filtered.length === 0) {
    card = "<p style='text-align: center; color: #999; padding: 20px;'>Nessun risultato trovato</p>";
  } else {
    for (let i = 0; i < filtered.length; i++) {
      const item = filtered[i];
      card += '<div class="card">';
      card += '<div class="card-header">';
      card += '<h2 class="card-title">' + (item.name || item.origin + " → " + item.destination) + '</h2>';
      card += '</div>';
      card += '<div class="card-info-visible">';

      if (section === "hotels") {
        card += '<div class="card-info">📍 ' + (item.address || '') + '</div>';
        card += '<div class="card-info">📞 ' + (item.phone || '') + '</div>';
      } else if (section === "flights") {
        card += '<div class="card-info">✈️ ' + (item.airline || '') + '</div>';
        card += '<div class="card-info">💶 ' + (item.price || '') + '€</div>';
      } else if (section === "restaurants") {
        card += '<div class="card-info">📍 ' + (item.address || '') + '</div>';
        card += '<div class="card-info">🍽️ ' + (item.cuisine || '') + '</div>';
      } else if (section === "places") {
        card += '<div class="card-info">📍 ' + (item.address || '') + '</div>';
        card += '<div class="card-info">ℹ️ ' + (item.description || '') + '</div>';
      }

      card += '</div>';
      card += '<div class="card-content show">';

      if (section === "hotels") {
        card += '<button class="card-button" onclick="showDetail(\'' + item.id + '\')">';
      } else if (section === "flights") {
        card += '<button class="card-button" onclick="showFlightDetail(\'' + item.id + '\')">';
      } else if (section === "restaurants") {
        card += '<button class="card-button" onclick="showRestaurantDetail(\'' + item.id + '\')">';
      } else if (section === "places") {
        card += '<button class="card-button" onclick="showPlaceDetail(\'' + item.id + '\')">';
      }

      card += 'Vai al dettaglio</button>';
      card += '</div>';
      card += '</div>';
    }
  }

  container.innerHTML = card;

  // Aggiorna il counter
  const counter = document.getElementById("resultsCount");
  if (counter) {
    counter.textContent = filtered.length + " risultati";
  }
}

// ==================== END AUTOCOMPLETE ====================

window.setSection = function(section) {
  currentSection = section;

  document.getElementById("contenitore-dettaglio").style.display = "none";
  document.getElementById("contenitore-card").style.display = "grid";
  document.getElementById("contenitore-card").innerHTML = "";

  if (section === "hotels")      getHotels();
  if (section === "restaurants") getRestaurants();
  if (section === "flights")     getFlights();
  if (section === "places")      getPlaces();
};



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
