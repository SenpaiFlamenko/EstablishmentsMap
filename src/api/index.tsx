import axios from "axios";
import { ICoordinate, SelectablePlaces } from "../App";

const travelAPI: string = process.env.REACT_APP_TRAVEL_API_KEY as string;

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
          "X-RapidAPI-Key": travelAPI,
        },
      }
    );
    return data;
  } catch (error) {}
};
