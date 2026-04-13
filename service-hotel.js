function getHotels(){
    let hotels = null ;

    const xhttp = new XMLHttpRequest();

    const url = "http://localhost:8080/hotels";

    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            hotels = JSON.parse(this.responseText);

        let card = "";

        for (let i = 0; i < hotels.length; i++) {
            card += '<div class="card">';
            card += '<div>';
            card += '<h2>${hotels[i].name}</h2>';
            card += '<hr class="divisore-card"/>';
            card += '</div>';
            card += '<div class="contenuto-card">Contenuto della card</div> ';
            card += '</button class="pulsante-card" onclick="oneclick(\'Vai al dettaglio\')">Vai al dettaglio</button>';
            card += '</div>';   
        }

        document.getElementById("contenitore-card").innerHTML = card;
    }
    }



xhttp.open("GET", url);

return xhttp.send();

}

document.getElementById("hotel").addEventListener("load", getHotels());
 
function oneclick(name) {
    alert("Hai cliccato su pulsante " + name + "nella pagina degli hotel");
}