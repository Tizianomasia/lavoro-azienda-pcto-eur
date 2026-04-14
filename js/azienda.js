let currentData = [];
let renderFunction = null;

// 🔥 collega dati + funzione render
function setData(data, renderFn) {
  currentData = data;
  renderFunction = renderFn;
  applyFilters();
}

// 🔍 SEARCH + FILTRI
function applyFilters() {
  const q = document.getElementById("searchInput").value.toLowerCase().trim();

  let filtered = [...currentData];

  // SEARCH
  if (q) {
    filtered = filtered.filter(item =>
      item.name.toLowerCase().includes(q) ||
      (item.address && item.address.toLowerCase().includes(q))
    );
  }

  // FILTRI
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
  document.getElementById("resultsCount").textContent =
    filtered.length + " risultati";
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
