import { Action } from '@ngrx/store';
import { WeatherCard, WeatherForecastCard } from '../models/weather-card.model';


export enum WeatherActionTypes {
    ADD_CARD = '[WEATHER] Add Card',
    ADD_CARD_SUCCESS = '[WEATHER] Add Card Success',
    ADD_CARD_FAILURE = '[WEATHER] Add Card Failure',
    DELETE_CARD = '[WEATHER] Delete Card',
    ADD_FORECAST = '[FORECAST] Add Forecast',
    ADD_FORECAST_SUCCESS = '[FORECAST] Add Forecast Success',
    ADD_FORECAST_FAILURE = '[FORECAST] Add Forecast Failure',
}

export class AddCardAction implements Action {
    readonly type = WeatherActionTypes.ADD_CARD;

    constructor(public payload: string) {};
}

export class AddCardSuccessAction implements Action {
    readonly type = WeatherActionTypes.ADD_CARD_SUCCESS;

    constructor(public payload: WeatherCard) {};
}

export class AddCardFailureAction implements Action {
    readonly type = WeatherActionTypes.ADD_CARD_FAILURE;

    constructor(public payload: string) {};
}

export class DeleteCardAction implements Action {
    readonly type = WeatherActionTypes.DELETE_CARD;

    constructor(public payload: string) {};
}


// Forecast

export class AddForecastAction implements Action {
    readonly type = WeatherActionTypes.ADD_FORECAST;

    constructor(public payload: string) {};
}

export class AddForecastSuccessAction implements Action {
    readonly type = WeatherActionTypes.ADD_FORECAST_SUCCESS;

    constructor(public payload: WeatherForecastCard) {};
}

export class AddForecastFailureAction implements Action {
    readonly type = WeatherActionTypes.ADD_FORECAST_FAILURE;

    constructor(public payload: string) {};
}



export type WeatherAction = AddCardAction
                        |   AddCardSuccessAction
                        |   AddCardFailureAction
                        |   DeleteCardAction
                        |   AddForecastAction
                        |   AddForecastSuccessAction
                        |   AddForecastFailureAction;