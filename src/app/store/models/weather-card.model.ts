export interface ForecastElement {
    dt: Date,
    main_temp: number,
    wind_speed: number,
}

export interface WeatherCard {
    id: string,
    city: string,
    temperature: number,
    latitude: number,
    longitude: number,
}

export interface WeatherForecastCard {
    id: string,
    forecast: ForecastElement[],
}