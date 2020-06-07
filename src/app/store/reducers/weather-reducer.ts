import { WeatherCard } from '../models/weather-card.model';
import { WeatherAction, WeatherActionTypes } from '../actions/weather.actions';
import produce from 'immer';

export interface WeatherState {
    cardList: Array<WeatherCard>,
    loading: boolean,
    error: string,
    mapLatitude: number,
    mapLongitude: number
}


const initialState: WeatherState = {
    cardList: [],
    loading: false,
    error: null,
    mapLatitude: -33.4462,
    mapLongitude: -70.6607
}

    

export const WeatherReducer = produce((state: WeatherState, action: WeatherAction) => {
    switch(action.type) {
        case WeatherActionTypes.ADD_CARD:
            state.loading = true;
            state.error = null;
            return;

        case WeatherActionTypes.ADD_CARD_SUCCESS:
            state.cardList.push(action.payload);
            state.loading = false;
            state.error = null;
            state.mapLatitude = action.payload.latitude;
            state.mapLongitude = action.payload.longitude;
            return;

        case WeatherActionTypes.ADD_CARD_FAILURE:
            state.loading = false;
            state.error = "City Not Found";
            return;

        case WeatherActionTypes.DELETE_CARD:
            state.cardList = state.cardList.filter(card => card.id !== action.payload);
            return;
    }
},  initialState
);
