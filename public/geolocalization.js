if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(myPosition, errorOnMyPosition, {enableHighAccuracy: true});
} else {
    alert('La geolocalizzazione non è attivata');
}

function errorOnMyPosition() {
    alert('Errore sulla localizzazione');
}

function myPosition(position) {
    let lat = position.coords.latitude;
    let long = position.coords.longitude;
    document.getElementById('root').innerHTML = 'La tua posizione ' + lat + ", " + long;
    document.getElementById("root").innerHTML = crypt.toString();
}