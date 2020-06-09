import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { 
    AddCardAction, 
    WeatherActionTypes, 
    AddCardSuccessAction,
    AddCardFailureAction, 
    AddForecastAction, 
    AddForecastFailureAction, 
    AddForecastSuccessAction 
} from '../actions/weather.actions';

import { WeatherApiService } from 'src/app/services/weather-api.service';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';



@Injectable()
export class WeatherEffects {

    @Effect() addCityWeather$ = this.actions$
        .pipe(
            ofType<AddCardAction>(WeatherActionTypes.ADD_CARD),
            mergeMap(
                (action) => this.weatherApiService.getCityWeather(action.payload)
                    .pipe(
                        map(data => new AddCardSuccessAction(data)),
                        catchError(error => of(new AddCardFailureAction(error.error)))
                    )
            )
        )

    @Effect() addCityForecast$ = this.actions$
        .pipe(
            ofType<AddForecastAction>(WeatherActionTypes.ADD_FORECAST),
            mergeMap(
                (action) => this.weatherApiService.getCityForecast(action.payload)
                    .pipe(
                        map(data => new AddForecastSuccessAction(data)),
                        catchError(error => of(new AddForecastFailureAction(error.error)))
                    )
            )
        )

    constructor (private actions$: Actions, private weatherApiService: WeatherApiService) {};
}