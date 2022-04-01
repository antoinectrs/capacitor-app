let map;
export const getCoords = async () => {
    const pos = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    });

    return {
        long: pos.coords.longitude,
        lat: pos.coords.latitude,
    };
};

export function drawMap(coords, zoom = 13) {
    map = L.map('map').setView([coords.latitude, coords.longitude], zoom);
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 20,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1IjoiYW50b2luZTk4IiwiYSI6ImNsMGprazdncDAxYzYzZWxhbzRlcWk2NDkifQ.JM4Xgke091LLntRvk9UbrA'
    }).addTo(map);
}

export function drawPastArea(content,htmlElem,textContent) {

    content.forEach(function (value, index) {
        let marker = L.marker([value.lat, value.lon]).addTo(map);

        console.log(marker._icon._leaflet_pos);
        // step 1 create your element
        var element = document.createElement(htmlElem);
        // step 2 create your text
        var text = document.createTextNode(textContent);
        // step 3 add (or append) your text to your element. Now your element had that new (or appended) value.
        element.appendChild(text);
        // step 4 add (or append) your newly created element with text to the tag with this id
        const target = document.getElementById("test");
        target.appendChild(element);
        element.style.left = marker._icon._leaflet_pos.x +"px";
        element.style.top = marker._icon._leaflet_pos.y +"px";
    });
}
export function drawMyPosition(coords,htmlElem,text) {
        let marker = L.marker([coords.latitude, coords.longitude]).addTo(map);
        // step 1 create your element
        var element = document.createElement(htmlElem);
        // step 2 create your text
        var text = document.createTextNode(text);
        // step 3 add (or append) your text to your element. Now your element had that new (or appended) value.
        element.appendChild(text);
        // step 4 add (or append) your newly created element with text to the tag with this id
        const target = document.getElementById("test");
        target.appendChild(element);
        element.style.left = marker._icon._leaflet_pos.x +"px";
        element.style.top = marker._icon._leaflet_pos.y +"px";
}