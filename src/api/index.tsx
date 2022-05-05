import axios from "axios";
import { ICoordinate } from "../App";

const URL =
  "https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary";

export const getPlacesData = async (ne: ICoordinate, sw: ICoordinate) => {
  try {
    const {
      data: { data },
    } = await axios.get(URL, {
      params: {
        bl_latitude: sw.lat,
        tr_latitude: ne.lat,
        bl_longitude: sw.lng,
        tr_longitude: ne.lng,
      },
      headers: {
        "X-RapidAPI-Host": "travel-advisor.p.rapidapi.com",
        "X-RapidAPI-Key": "b3dea6db2emsh9008a08663d880dp1836b5jsna237c6442237",
      },
    });
    return data;
  } catch (error) {}
};
