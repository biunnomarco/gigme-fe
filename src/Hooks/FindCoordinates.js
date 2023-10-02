
export const FindCoordinates = async (city) => {
    console.log(city)
    const url = "https://nominatim.openstreetmap.org/search?format=json&limit=3&q=" + city;
    const res = await fetch(url)
    const data = await res.json()

    if (data.length > 0) {
        const coordinates = {
            lat: data[0].lat,
            lon: data[0].lon,
        }
        return coordinates
    } else {
        return false
    }

}

export const DistanceBetween = (lat1, lon1, lat2, lon2) => {
    var R = 6371; // raggio medio della Terra in km
    var dLat = (lat2-lat1) * Math.PI / 180;
    var dLon = (lon2-lon1) * Math.PI / 180; 
    var a = Math.sin(dLat/2) * Math.sin(dLat/2) + 
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon/2) * Math.sin(dLon/2); 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c;
    return d;
}
