export interface IWeather {
  main: MainInfo;
  weather: Weather[];
}

type MainInfo = {
  temp: number;
};

type Weather = {
  main: string;
  icon: string;
};
