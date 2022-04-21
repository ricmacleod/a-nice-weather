import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import {
  ILocationResult,
  IWeatherResult,
  ILocationCordinates
} from 'src/app/interfaces/services.interfaces';
import { GetWeatherService } from 'src/app/services/get-weather.service';

@Component({
  selector: 'app-weather-info',
  templateUrl: './weather-info.component.html',
  styleUrls: ['./weather-info.component.css'],
})
export class WeatherInfoComponent implements OnInit {

  constructor(private _weatherService: GetWeatherService) { }

  // Background Theming
  rainBackground = 'assets/backgrounds/rain.png';
  sunnyBackground = 'assets/backgrounds/sunny.png';
  stormBackground = 'assets/backgrounds/storm.png';
  clearBackground = 'assets/backgrounds/clear.png';
  cloudyBackground = 'assets/backgrounds/cloudy.png';
  fogBackground = 'assets/backgrounds/fog.jpg';

  public currentCondition = '';

  private _currentDashboardBackground = 'assets/backgrounds/storm.png';
  public backgroundStyle = {
    'background-color': 'black',
    backgroundImage: `url(${this._currentDashboardBackground})`,
    'background-size': 'cover',
    // Height seems not to be set automatically
    height: '1440px',
    // This is a bit hacky, need to find a way to change the background for the body
    margin: '-10px',
  };

  handleWeatherChange($event: any) {
    console.log('recieved +++++', $event);
    this.currentCondition = $event;
    this.changeDashboardBackground = this.currentCondition
  }

  get currentDashboardBackground() {
    return this._currentDashboardBackground;
  }

  set changeDashboardBackground(currentCondition: string) {
    console.log(
      'I have this for the background ---->',
      currentCondition.toLowerCase()
    );
    switch (currentCondition) {
      case 'rain':
      this._currentDashboardBackground = this.rainBackground;
      break;
      case 'sunny':
      this._currentDashboardBackground = this.sunnyBackground;
      break;
      case 'storm':
      this._currentDashboardBackground = this.stormBackground;
      break;
      case 'clear' || 'clear sky':
      this._currentDashboardBackground = this.clearBackground;
      break;
      case 'cloudy':
      this._currentDashboardBackground = this.cloudyBackground;
      break;
      case 'fog':
      this._currentDashboardBackground = this.fogBackground;
      break;
      default:
      this._currentDashboardBackground = this.sunnyBackground;
      break;
    }
  }

  // Dummy info from example, need to remove, if this shows something broke
  public dashboardData = {
    currentTemp: "LOADING",
    units: 'f',
    location: 'LOADING',
    condition: 'LOADING',
    maxTemp: "LOADING",
    minTemp: "LOADING",
  };

  locationToSearch = "";

  weatherDashboard: any;
  isWeatherLoaded = false;

  setDashboardWeather(weather: IWeatherResult) {
    this.dashboardData.currentTemp = parseFloat(
      (weather.main.temp - 273.15).toFixed(1)
    ).toString();
    // Need to move this so that F/C can be selected
    this.dashboardData.units = 'c';
    this.dashboardData.location = weather.name + ', ' + weather.sys.country;
    // Not sure why this comes back as an array
    this.dashboardData.condition = weather.weather[0].description.replace(
      /^\w/,
      (c) => c.toUpperCase()
    );
    console.log('sending this condition ***', this.dashboardData.condition)
    // Harcoded Celsius for now
    this.dashboardData.maxTemp = parseFloat(
      (weather.main.temp_max - 273.15).toFixed(1)
    ).toString();
    this.dashboardData.minTemp = parseFloat(
      (weather.main.temp_min - 273.15).toFixed(1)
    ).toString();
    console.log('Dashboard data change =====', this.dashboardData);
  }

  async loadWeatherInfo(locationProvided?: ILocationCordinates) {
    let locations: ILocationResult[];
    let weather: IWeatherResult;
    if(locationProvided){
      try {
        this._weatherService.getWeather(locationProvided.latitude, locationProvided.longitude).subscribe((weatherData) => {
          weather = weatherData;
          this.setDashboardWeather(weather);
        });
        return true;
      } catch (error){
        console.log('Error with reloaded weather ----', error)
        return false
      }
    } else {
      try {
        this._weatherService
        .getLocation({
          cityName: 'Monterrey',
          stateCode: '',
          countryCode: 'MEX',
        })
        .subscribe((locationData) => {
          // Using only the first value for now
          locations = locationData;
          console.log('got this location >>>>>', locationData);
          this._weatherService
          .getWeather(locations[0].lat, locations[0].lon)
          .subscribe((weatherData) => {
            weather = weatherData;
            this.setDashboardWeather(weather);
          });
        });
        return true;
      } catch (error) {
        console.log('Error on loading dashboard weather ....', error);
        return false;
      }
    }
  }

  async askForLocation(): Promise<ILocationCordinates> {
    const currentLocation = await this._weatherService.getCurrentLocation()
    console.log('testing current location ____', currentLocation)
    return currentLocation
  }

  hasWeather() {
    if (sessionStorage.getItem('userProvidedLatitude') && sessionStorage.getItem('userProvidedLongitude')) {
      console.log('Loading Previous Weather Info')
      const loadLat = parseInt(sessionStorage.getItem('userProvidedLatitude')!);
      const loadLon = parseInt(sessionStorage.getItem('userProvidedLongitude')!);
      const previousWeather = {latitude: loadLat,longitude: loadLon }
      console.log('MADE THIS PREV WEATHER ++++', previousWeather)
      this.loadWeatherInfo(previousWeather).then((loadWeatherComplete) => {
        if (loadWeatherComplete) {
          console.log('got here  ^^^^ current:::', this.isWeatherLoaded);
          this.isWeatherLoaded = loadWeatherComplete;
          console.log('got here  ^^^^ changed:::', this.isWeatherLoaded);
        }
      })
    } else {
      console.log('No Weather Info In Storage, Asking User')
      this.askForLocation().then(() => {
        this.loadWeatherInfo().then((loadWeatherComplete) => {
          if (loadWeatherComplete) {
            console.log('got here  ^^^^ current:::', this.isWeatherLoaded);
            this.isWeatherLoaded = loadWeatherComplete;
            console.log('got here  ^^^^ changed:::', this.isWeatherLoaded);
          }
        })
      })
    }
  }

  ngOnInit(): void {
    this.hasWeather()
  }
}
