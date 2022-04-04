import { Injectable } from '@angular/core';
import {
  ILocationResult,
  IWeatherResult,
} from '../interfaces/services.interfaces';

@Injectable({
  providedIn: 'root',
})
export class GetWeatherService {
  constructor() {}
  APIKey = '2e2f3da5b9ccddb4f982bd869e8ec1d7';
  async getWeather(latitude: number, longitude: number) {
    const weatherEndpoint = 'https://api.openweathermap.org/data/2.5/';
    let weather;
    const fetchWeather = await fetch(
      `${weatherEndpoint}/weather?lat=${latitude}&lon=${longitude}&appid=${this.APIKey}`
    )
      .then((response) => {
        console.log('THIS WEATHER ---', response);
        return response.json();
      })
      .then((processed) => {
        console.log('got this finally', processed);
        weather = processed;
      });
    return weather as unknown as IWeatherResult;
  }
  async getLocation(
    cityName: string,
    stateCode: string,
    countryCode: string,
    // Need to limit the results when adding the input textbox
    resultsLimit?: number
  ) {
    const locationEndpoint = 'http://api.openweathermap.org/geo/1.0';
    let coordinates;
    await fetch(
      `${locationEndpoint}/direct?q=${cityName},${stateCode},${countryCode}&limit=1&appid=${this.APIKey}`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log('GOT THIS COORDINATE DATA ---', data);
        // Using only the first location for now
        coordinates = data[0];
      });
    return coordinates as unknown as ILocationResult;
  }
}
