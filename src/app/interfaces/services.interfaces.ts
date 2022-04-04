export interface ILocationResult {
  country: string;
  name: string;
  state: string;
  local_names: {
    ar: string;
    es: string;
    oc: string;
    pt: string;
    zh: string;
  };
  lat: number;
  lon: number;
}

interface SingleWeatherElement {
  description: string;
  icon: string;
  id: number;
  main: string;
}

export interface IWeatherResult {
  base: string;
  clouds: {
    all: number;
  };
  cod: 200;
  coord: {
    lon: number;
    lat: number;
  };
  main: {
    feels_like: number;
    humidity: number;
    pressure: number;
    temp: number;
    temp_max: number;
    temp_min: number;
  };
  name: string;
  sys: {
    country: string;
    id: number;
    sunrise: number;
    sunset: number;
    type: number;
  };
  timezone: number;
  visibility: number;
  weather: SingleWeatherElement[];
}
