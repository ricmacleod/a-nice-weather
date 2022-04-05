import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  ILocationResult,
  IWeatherResult,
} from '../interfaces/services.interfaces';

@Injectable()
export class GetWeatherService {
  constructor(private http: HttpClient) {}
  APIKey = '2e2f3da5b9ccddb4f982bd869e8ec1d7';
  getWeather(latitude: number, longitude: number): Observable<IWeatherResult> {
    console.log('these numbers >>>>>>', latitude, longitude);
    const weatherEndpoint = 'https://api.openweathermap.org/data/2.5/';
    // const fetchWeather = await fetch(
    //   `${weatherEndpoint}/weather?lat=${latitude}&lon=${longitude}&appid=${this.APIKey}`
    // )
    //   .then((response) => {
    //     console.log('THIS WEATHER ---', response);
    //     return response.json();
    //   })
    //   .then((processed) => {
    //     console.log('got this finally', processed);
    //     weather = processed;
    //   });
    return this.http.get<IWeatherResult>(
      `${weatherEndpoint}/weather?lat=${latitude}&lon=${longitude}&appid=${this.APIKey}`
    );
  }
  getLocation({
    cityName,
    stateCode,
    countryCode,
    resultsLimit,
  }: {
    cityName: string;
    stateCode: string;
    countryCode: string;
    // Need to limit the results when adding the input textbox
    resultsLimit?: number;
  }): Observable<ILocationResult[]> {
    const locationEndpoint = 'https://api.openweathermap.org/geo/1.0';
    // let coordinates;
    // await fetch(
    //   `${locationEndpoint}/direct?q=${cityName},${stateCode},${countryCode}&limit=1&appid=${this.APIKey}`
    // )
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log('GOT THIS COORDINATE DATA ---', data);
    //     // Using only the first location for now
    //     coordinates = data[0];
    //   });
    return this.http.get<ILocationResult[]>(
      `${locationEndpoint}/direct?q=${cityName},${stateCode},${countryCode}&limit=1&appid=${this.APIKey}`
    );
  }
}
