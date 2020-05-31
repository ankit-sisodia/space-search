import { isFulfilled } from "../createAsyncActions";
import { 
    GET_PLANETS, 
    UPDATE_SELECTED_PLANET, 
    GET_VEHICLES, 
    UPDATE_SELECTED_VEHICLE,
    RESET_SEARCH,
    GET_TOKEN,
    FIND_FALCONE
 } from "../constants";


const initialState = {
    searches: 4,
    token: '',
    planets: [],
    vehicles: [],
    selectedPlanet: {},
    selectedVehicle: {},
    foundFalcone: {
        planet: '',
        status: ''
    }
}
const rootReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_PLANETS: {
            if(!isFulfilled(action)) return state;
            const planets = [ ...initialState.planets, ...action.payload ];
            let newState = { ...state, planets };
            return newState;
        }
        case GET_VEHICLES: {
            if(!isFulfilled(action)) return state;
            const vehicles = [ ...initialState.vehicles, ...action.payload ];
            let newState = { ...state, vehicles };
            return newState;
        }
        case GET_TOKEN: {
            if(!isFulfilled(action)) return state;
            return {...state, token: action.payload};
        }
        case RESET_SEARCH: {
            return {...state, selectedPlanet: {}, selectedVehicle: {}};
        }
        case UPDATE_SELECTED_PLANET: {
            let selectedPlanet = {...state.selectedPlanet};
            selectedPlanet[action.payload.key] = action.payload.value;
            return {...state, selectedPlanet};
        }
        case UPDATE_SELECTED_VEHICLE: {
            let selectedVehicle = {...state.selectedVehicle};
            selectedVehicle[action.payload.key] = action.payload.value;
            return {...state, selectedVehicle};
        }
        case FIND_FALCONE: {
            if(!isFulfilled(action)) return state;
            const { planet_name, status } = action.payload;
            return {...state, foundFalcone: {planet: planet_name, status}};
        }
        default:
            return state;
    }
}

export default rootReducer;