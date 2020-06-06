import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { WeatherReducer } from './store/reducers/weather-reducer';
import { WeatherListComponent } from './components/weather-list/weather-list.component';
import { EffectsModule } from '@ngrx/effects';
import { WeatherEffects } from './store/effects/weather.effects';
import { CityFormComponent } from './components/city-form/city-form.component';
import { CityCardComponent } from './components/city-card/city-card.component';

@NgModule({
  declarations: [
    AppComponent,
    WeatherListComponent,
    CityFormComponent,
    CityCardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    StoreModule.forRoot({
      weather: WeatherReducer,
    }),
    EffectsModule.forRoot([WeatherEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
