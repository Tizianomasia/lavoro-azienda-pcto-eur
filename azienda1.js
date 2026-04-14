document.addEventListener('DOMContentLoaded', function() {
    // =========================
    // CAMBIO TEMA
    // =========================
    document.querySelectorAll('input[name="tema"]').forEach(function(radio) {
        radio.addEventListener('change', function() {
            if (this.value === 'scuro') {
                document.body.classList.add('tema-scuro');
                localStorage.setItem('tema', 'scuro');
            } else {
                document.body.classList.remove('tema-scuro');
                localStorage.setItem('tema', 'chiaro');
            }
        });
    });

    if (localStorage.getItem('tema') === 'scuro') {
        document.body.classList.add('tema-scuro');
        document.querySelector('input[name="tema"][value="scuro"]').checked = true;
    }

    // =========================
    // CAMBIO LINGUA
    // =========================
    const langSelect = document.getElementById('langSelect');

    // Dizionario delle parole
    const dictionary = {
        it: {
            login: "Accedi",
            register: "Registrati",
            welcomeTitle: "Benvenuto",
            welcomeText: "Questa è una demo"
        },
        en: {
            login: "Login",
            register: "Register",
            welcomeTitle: "Welcome",
            welcomeText: "This is a demo"
        }
    };

    function updateLanguage(lang) {
        document.getElementById('loginBtn').textContent = dictionary[lang].login;
        document.getElementById('registerBtn').textContent = dictionary[lang].register;
        document.getElementById('welcomeTitle').textContent = dictionary[lang].welcomeTitle;
        document.getElementById('welcomeText').textContent = dictionary[lang].welcomeText;
        localStorage.setItem('lang', lang);
    }

    // Carica lingua salvata
    const savedLang = localStorage.getItem('lang') || 'it';
    langSelect.value = savedLang;
    updateLanguage(savedLang);

    // Cambia lingua quando selezionata
    langSelect.addEventListener('change', function() {
        updateLanguage(this.value);
    });

    // =========================
    // CODICE PRECEDENTE: FILTRI, CARDS, ALBUM, CONTATTI ecc.
    // =========================
    const searchInput     = document.getElementById('searchInput');
    const filterBtn       = document.getElementById('filterBtn');
    const dropdown        = document.getElementById('filterDropdown');
    const applyBtn        = document.getElementById('applyBtn');
    const counter         = document.getElementById('resultsCount');
    const albumHoverBtn   = document.getElementById('albumHoverBtn');
    const albumPanel      = document.getElementById('albumPanel');
    const albumPanelClose = document.getElementById('albumPanelClose');
    const albumPanelOk    = document.getElementById('albumPanelOk');
    const section         = document.querySelector('section');
    const searchBar       = document.querySelector('.search-bar');

    let currentSort = null;

    // FILTRI
    filterBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        dropdown.classList.toggle('show');
        filterBtn.classList.toggle('open');
    });

    document.addEventListener('click', function() {
        dropdown.classList.remove('show');
        filterBtn.classList.remove('open');
    });

    dropdown.addEventListener('click', function(e) {
        e.stopPropagation();
    });

    document.querySelectorAll('.dd-option').forEach(function(opt) {
        opt.querySelector('input').addEventListener('change', function() {
            document.querySelectorAll('.dd-option').forEach(function(o) {
                o.classList.remove('selected');
            });
            opt.classList.add('selected');
        });
    });

    applyBtn.addEventListener('click', function() {
        const sv = document.querySelector('input[name="sort"]:checked');
        currentSort = sv ? sv.value : null;
        dropdown.classList.remove('show');
        filterBtn.classList.remove('open');
        applyFilters();
    });

    searchInput.addEventListener('input', applyFilters);

    function applyFilters() {
        const q = searchInput.value.toLowerCase().trim();
        const cards = Array.from(section.querySelectorAll('.card'));

        cards.forEach(function(card) {
            const nome   = (card.dataset.nome || '').toLowerCase();
            const tipo   = (card.dataset.tipo || '').toLowerCase();
            const prezzo = parseFloat(card.dataset.prezzo) || 0;

            let visible = true;
            if (q && !nome.includes(q) && !tipo.includes(q)) visible = false;
            if (currentSort === 'budget1' && prezzo > 50)    visible = false;
            if (currentSort === 'budget2' && prezzo > 150)   visible = false;
            if (currentSort === 'budget3' && prezzo <= 150)  visible = false;

            card.classList.toggle('hidden', !visible);
        });

        const visible = cards.filter(function(c) { return !c.classList.contains('hidden'); });
        const hidden  = cards.filter(function(c) { return  c.classList.contains('hidden'); });

        if (currentSort === 'asc')  visible.sort(function(a,b){ return parseFloat(a.dataset.prezzo) - parseFloat(b.dataset.prezzo); });
        if (currentSort === 'desc') visible.sort(function(a,b){ return parseFloat(b.dataset.prezzo) - parseFloat(a.dataset.prezzo); });

        visible.concat(hidden).forEach(function(c) { section.appendChild(c); });

        const n = visible.length;
        counter.textContent = n + ' risultat' + (n === 1 ? 'o' : 'i');
    }

    applyFilters();

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

});