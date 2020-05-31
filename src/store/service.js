import axios from 'axios';
export const axiosInstance = axios.create({
    baseURL: 'https://findfalcone.herokuapp.com'
});
class SearchFalconeService {
    static routes = {
        GET_PLANETS: '/planets',
        GET_VEHICLES: '/vehicles',
        FIND_FALCONE: '/find',
        GET_TOKEN: '/token'
    }

    getPlanets() {
        return axiosInstance.get(SearchFalconeService.routes.GET_PLANETS)
            .then(({data}) => data.map(({name, distance}, index) => ({
                label: name,
                id: index,
                value: name,
                distance: distance,
                selected: false
            }))
        );
    }

    getVehicles() {
        return axiosInstance.get(SearchFalconeService.routes.GET_VEHICLES)
            .then(({ data }) => data.map((d, id)=>({...d, id})
        ));
    }

    getToken() {
        return axiosInstance.post(SearchFalconeService.routes.GET_TOKEN, {}, {
            headers: {
                'Accept': 'application/json'
            }
        }).then(({data}) => data.token);
    }

    findFalcone(data) {
        return axiosInstance.post(SearchFalconeService.routes.FIND_FALCONE, data, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application-json'
            }
        
        }).then(({data}) => data);
    }
}

export default SearchFalconeService;