import axios from "axios";
import { ICoordinate, SelectablePlaces } from "../App";

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
          "X-RapidAPI-Key":
            "b3dea6db2emsh9008a08663d880dp1836b5jsna237c6442237",
        },
      }
    );
    return data;
  } catch (error) {}
};
