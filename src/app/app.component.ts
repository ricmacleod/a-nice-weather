import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
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
  title = 'nice-weather-app';
}
