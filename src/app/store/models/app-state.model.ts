import { WeatherState } from '../reducers/weather-reducer';

export interface AppState {
    readonly weather: WeatherState;
}