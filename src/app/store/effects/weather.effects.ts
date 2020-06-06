import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { AddCardAction, WeatherActionTypes, AddCardSuccessAction, AddCardFailureAction } from '../actions/weather.actions';
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

    constructor (private actions$: Actions, private weatherApiService: WeatherApiService) {};
}