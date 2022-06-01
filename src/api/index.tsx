import axios from "axios";
import { ICoordinate, SelectablePlaces } from "../App";

const rapidAPI: string = process.env.REACT_APP_RAPID_API_KEY as string;

export const getPlacesData = async (
  type: SelectablePlaces,
  ne: ICoordinate,
  sw: ICoordinate
) => {
  try {
    const {
      data: { data },
    } = await axios.get(
      `https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`,
      {
        params: {
          bl_latitude: sw.lat,
          tr_latitude: ne.lat,
          bl_longitude: sw.lng,
          tr_longitude: ne.lng,
        },
        headers: {
          "X-RapidAPI-Host": "travel-advisor.p.rapidapi.com",
          "X-RapidAPI-Key": rapidAPI,
        },
      }
    );
    return data;
  } catch (error) {}
};

export const getWeatherData = async (lat: number, lng: number) => {
  try {
    const { data } = await axios.get(
      "https://community-open-weather-map.p.rapidapi.com/weather",
      {
        params: {
          lat: lat,
          lon: lng,
          units: "metric",
        },
        headers: {
          "X-RapidAPI-Host": "community-open-weather-map.p.rapidapi.com",
          "X-RapidAPI-Key": rapidAPI,
        },
      }
    );
    return data;
  } catch (error) {}
};
