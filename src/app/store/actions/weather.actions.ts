import { Action } from '@ngrx/store';
import { WeatherCard } from '../models/weather-card.model';


export enum WeatherActionTypes {
    ADD_CARD = '[WEATHER] Add Card',
    ADD_CARD_SUCCESS = '[WEATHER] Add Card Success',
    ADD_CARD_FAILURE = '[WEATHER] Add Card Failure',
    DELETE_CARD = '[WEATHER] Delete Card'
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



export type WeatherAction = AddCardAction
                        |   AddCardSuccessAction
                        |   AddCardFailureAction
                        |   DeleteCardAction;