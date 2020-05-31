export const getTime = (planets, vehicles, selectedPlanets, selectedVehicles) => {
    let time = 0;

    for( let key in selectedPlanets) {
        const planet = planets.find(planet => planet.value === selectedPlanets[key]);
        const distance = planet && planet.distance;
        const vehicle = vehicles.find(vehicle => vehicle.name === selectedVehicles[key]);
        const speed = vehicle && vehicle.speed;
        if( distance && speed && distance/speed > time ) time = distance/speed;
    }

    return time;
} 