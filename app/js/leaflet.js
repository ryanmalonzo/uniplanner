// Leaflet utils

class Point {
  constructor(lat, long) {
    this.lat = lat;
    this.long = long;
  }
}

const drawMarker = (map, point) => {
  return L.marker([point.lat, point.long]).addTo(map);
};

const addPopup = (object, text) => {
  return object.bindPopup(text);
};

// const openPopup = (popup) => {
//   return popup.openPopup();
// };

const addAutoPopup = (map, point, text) => {
  return L.popup()
    .setLatLng([point.lat, point.long])
    .setContent(text)
    .openOn(map);
};

export { Point, drawMarker, addPopup, addAutoPopup };
