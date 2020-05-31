import { combineEpics, ofType } from 'redux-observable';
import { createActions } from 'redux-actions';
import { from, of } from 'rxjs';
import { mergeMap, filter } from 'rxjs/operators'; 
import createAsyncActions, { isStart } from '../createAsyncActions';
import SearchFalconeService from './service';
import { 
    GET_PLANETS, 
    GET_VEHICLES, 
    UPDATE_SELECTED_PLANET, 
    UPDATE_SELECTED_VEHICLE,
    RESET_SEARCH,
    GET_TOKEN,
    FIND_FALCONE,
    FETCH_INITIAL_DATA
} from '../constants';

const { 
    getPlanets,
    getPlanetsFulfilled,
    getPlanetsError,

    getVehicles,
    getVehiclesFulfilled,
    getVehiclesError,

    getToken,
    getTokenFulfilled,
    getTokenError,

    findFalcone,
    findFalconeFulfilled,
    findFalconeError,

    fetchInitialData,
    fetchInitialDataFulfilled,
    fetchInitialDataError
 } = createAsyncActions([
    GET_PLANETS,
    GET_VEHICLES,
    GET_TOKEN,
    FIND_FALCONE,
    FETCH_INITIAL_DATA
 ]);

const {
    updateSelectedPlanet,
    updateSelectedVehicle,
    resetSearch
} = createActions(
    UPDATE_SELECTED_PLANET,
    UPDATE_SELECTED_VEHICLE,
    RESET_SEARCH
);

export {
    fetchInitialData,
    fetchInitialDataFulfilled,
    fetchInitialDataError,

    getPlanets,
    getPlanetsFulfilled,
    getPlanetsError,

    getVehicles,
    getVehiclesFulfilled,
    getVehiclesError,

    getToken,
    getTokenFulfilled,
    getTokenError,

    findFalcone,
    findFalconeFulfilled,
    findFalconeError,

    updateSelectedPlanet,
    updateSelectedVehicle,
    resetSearch
}

function fetchInitialDataEpic(action$) {
    return action$.pipe(ofType(FETCH_INITIAL_DATA), filter(isStart), mergeMap(() => of(
        getPlanets(), getVehicles(), getToken()
    )));
}

function getVehiclesEpic(action$) {
    return action$.pipe(ofType(GET_VEHICLES), filter(isStart), mergeMap(action => {
        const service = new SearchFalconeService();
        return from(service.getVehicles())
            .pipe(mergeMap(response => of(getVehiclesFulfilled(response))));
    }));
}

function getPlanetsEpic(action$) {
    return action$.pipe(ofType(GET_PLANETS), filter(isStart), mergeMap(action => {
        const service = new SearchFalconeService();
        return from(service.getPlanets())
            .pipe(mergeMap(response => of(getPlanetsFulfilled(response))));
    }));
}

function getTokenEpic(action$) {
    return action$.pipe(ofType(GET_TOKEN), filter(isStart), mergeMap(action => {
        const service = new SearchFalconeService();
        return from(service.getToken())
            .pipe(mergeMap(response => of(getTokenFulfilled(response))));
    }));
}

function findFalconeEpic(action$, store$) {
    return action$.pipe(ofType(FIND_FALCONE), filter(isStart), mergeMap(action => {
        const { selectedPlanet, selectedVehicle, token } = store$.value;
        const service = new SearchFalconeService();
        const { push } = action.payload;
        return from(service.findFalcone({
            token: token,
            planet_names: Object.values(selectedPlanet),
            vehicle_names: Object.values(selectedVehicle)
        }))
        .pipe(mergeMap(response => {
            push('/find');
            return of(findFalconeFulfilled(response))
        }));
    }));
}

export default combineEpics(
    fetchInitialDataEpic,
    getPlanetsEpic, 
    getVehiclesEpic, 
    getTokenEpic, 
    findFalconeEpic
);