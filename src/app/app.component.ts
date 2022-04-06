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

handleWeatherChange($event: any){
  console.log('recieved +++++', $event);
  this.currentCondition = $event
}

public dashboardBackground() {
  let background: string;
  console.log('I have this for the background ---->', this.currentCondition.toLowerCase());
  switch (this.currentCondition) {
    case 'rain':
      background = this.rainBackground;
      break;
    case 'sunny':
      background = this.sunnyBackground;
      break;
    case 'storm':
      background = this.stormBackground;
      break;
    case 'clear' || 'clear sky':
      background = this.clearBackground;
      break;
    case 'cloudy':
      background = this.cloudyBackground;
      break;
    case 'fog':
      background = this.fogBackground;
      break;
    default:
      background = this.sunnyBackground;
      break;
  }
  const backgroundStyle = {
    'background-color': 'black',
    backgroundImage: `url(${background})`,
    'background-size': 'cover',
    // Height seems not to be set automatically
    height: '1440px',
    // This is a bit hacky, need to find a way to change the background for the body
    margin: '-10px',
  };
  return backgroundStyle;
}
title = 'nice-weather-app';
}
