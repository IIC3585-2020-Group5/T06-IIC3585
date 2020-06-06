import { WeatherCard } from '../models/weather-card.model';
import { WeatherAction, WeatherActionTypes } from '../actions/weather.actions';


export interface WeatherState {
    cardList: Array<WeatherCard>,
    loading: boolean,
    error: Error
}


const initialState: WeatherState = {
    cardList: [],
    loading: false,
    error: null
}

    

export function WeatherReducer(state: WeatherState = initialState, action: WeatherAction) {
    switch(action.type) {
        case WeatherActionTypes.ADD_CARD:
            return { ...state, loading: true, error: null };

        case WeatherActionTypes.ADD_CARD_SUCCESS:
            return { 
                ...state, 
                cardList: [...state.cardList, action.payload ],
                loading: false,
                error: null
            };

        case WeatherActionTypes.ADD_CARD_FAILURE:
            return { ...state, error: "City Not Found", loading: false };

        case WeatherActionTypes.DELETE_CARD:
            return { ...state,
                    cardList: state.cardList.filter(card => card.id !== action.payload) };
        
        default:
            return state;
    }
}

