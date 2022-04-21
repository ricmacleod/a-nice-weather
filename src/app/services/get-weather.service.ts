import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  ILocationResult,
  IWeatherResult,
  ILocationCordinates
} from '../interfaces/services.interfaces';

@Injectable()
export class GetWeatherService {
  constructor(private http: HttpClient) {}
  APIKey = '2e2f3da5b9ccddb4f982bd869e8ec1d7';
  getWeather(latitude: number, longitude: number): Observable<IWeatherResult> {
    console.log('these numbers >>>>>>', latitude, longitude);
    const weatherEndpoint = 'https://api.openweathermap.org/data/2.5/';
    return this.http.get<IWeatherResult>(
      `${weatherEndpoint}/weather?lat=${latitude}&lon=${longitude}&appid=${this.APIKey}`
    );
  }
  getLocation({
    cityName,
    stateCode,
    countryCode,
    // resultsLimit,
  }: {
    cityName: string;
    stateCode: string;
    countryCode: string;
    getCurrent?:boolean,
    // Need to limit the results when adding the input textbox
    resultsLimit?: number;
  }): Observable<ILocationResult[]> {
    const locationEndpoint = 'https://api.openweathermap.org/geo/1.0';
    const defaultLocation = this.http.get<ILocationResult[]>(
      `${locationEndpoint}/direct?q=${cityName},${stateCode},${countryCode}&limit=1&appid=${this.APIKey}`
    );
    return defaultLocation
  }
  async getCurrentLocation(): Promise<ILocationCordinates> {
    let coordinates = {latitude: 0, longitude: 0};
    async function locationBroweserAPI (position:any){
      const locationObject = {latitude: position.coords.latitude, longitude: position.coords.longitude}
      console.log('GOT CURRENT LOCATION ????', locationObject)
      sessionStorage.setItem('userProvidedLatitude', locationObject.latitude.toString())
      sessionStorage.setItem('userProvidedLongitude', locationObject.longitude.toString())
      coordinates = locationObject;
    }
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(locationBroweserAPI,(error)=>{
        switch(error.code) {
          case error.PERMISSION_DENIED:
          console.log("Permissions denied for getting location")
          break;
          case error.POSITION_UNAVAILABLE:
          console.log("Unavailable")
          break;
          case error.TIMEOUT:
          console.log("Timeout")
          break;
        }
        coordinates = {latitude: 0, longitude: 0}
      });
    } else {
      console.log("Location API is not supported")
      coordinates = {latitude: 0, longitude: 0}
    }
    return coordinates
  }
}
