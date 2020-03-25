

let mystorage = JSON.parse(localStorage.getItem("centres"));



function test(){

    const mymap = L.map('mapid').setView([45.56673,5.930244],13);
        L.tileLayer( 'https://maps.heigit.org/openmapsurfer/tiles/roads/webmercator/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 17,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'your.mapbox.access.token'
    }).addTo(mymap);

    var paramsString = new URLSearchParams(window.location.search);
    var urlParams = paramsString.get('recordid');
    for (let i = 0; i<mystorage.records.length; i++) {
        if(urlParams === mystorage.records[i].recordid) {
            let lat =mystorage.records[i].fields.localisation[0];
            let log = mystorage.records[i].fields.localisation[1];
            const myIcon =  L.icon({iconUrl: './assets/media/leaf-orange.png '});
            let namecenter = mystorage.records[i].fields.nom_structure
            let phone = mystorage.records[i].fields.coord_tel
            let adress = mystorage.records[i].fields.adresse     
            L.marker([lat, log], {icon: myIcon}).addTo(mymap).bindTooltip(`${namecenter}<br>${phone}<br>${adress}`).openTooltip();
      
        } else {
            let lat =mystorage.records[i].fields.localisation[0];
            let log = mystorage.records[i].fields.localisation[1];
            let marker= L.icon({
            iconUrl: './assets/media/leaf-red.png '});
            let namecenter=mystorage.records[i].fields.nom_structure;  
            L.marker([lat, log],{icon: marker}).addTo(mymap).bindTooltip(`${namecenter}`);   
        }
    }
}
test();





