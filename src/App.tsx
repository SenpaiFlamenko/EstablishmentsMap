import React, { useEffect, useState } from "react";
import { CssBaseline, Grid } from "@mui/material";
import Header from "./components/Header/Header";
import Map from "./components/Map/Map";
import { getPlacesData, getWeatherData } from "./api";
import { IWeather } from "./shared/types/weather-types";
import Menu from "./components/Menu/Menu";
import { AppStoreProvider } from "./store";

export interface ICoordinate {
  lat: number;
  lng: number;
}

export interface IBounds {
  ne: ICoordinate;
  sw: ICoordinate;
}

export type SelectablePlaces = "hotels" | "restaurants" | "attractions";
export type SelectableRating = 0 | 3.0 | 4.0 | 4.5;

const App = () => {
  const [places, setPlaces] = useState<any[]>([]);
  const [coordinates, setCoordinates] = useState<ICoordinate | null>(null);
  const [bounds, setBounds] = useState<IBounds | null>(null);
  const [childClicked, setChildClicked] = useState<number>(0);
  const [filteredPlaces, setFilteredPlaces] = useState<any[]>([]);
  const [weatherData, setWeatherData] = useState<IWeather | null>(null);

  const [isLoading, setIsLoading] = useState(false);

  const [type, setType] = useState<SelectablePlaces>();
  const [rating, setRating] = useState<SelectableRating>(0);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setCoordinates({ lat: latitude, lng: longitude });
      }
    );
  }, []);

  useEffect(() => {
    setIsLoading(true);
    if (!bounds) return;
    const { ne, sw } = bounds;

    getPlacesData(ne, sw, type).then((data) => {
      setPlaces(data);
      setIsLoading(false);
    });
  }, [bounds, type]);

  useEffect(() => {
    coordinates &&
      getWeatherData(coordinates.lat, coordinates.lng).then((data) => {
        setWeatherData(data);
      });
  }, [coordinates]);

  useEffect(() => {
    const filteredPlaces = places.filter((place) => place.rating >= rating);
    setFilteredPlaces(filteredPlaces);
  }, [rating, places]);

  return (
    <AppStoreProvider>
      <CssBaseline />
      <Header setCoordinates={setCoordinates} weatherData={weatherData} />
      <Grid container spacing={0} style={{ width: "100%", flexGrow: "1" }}>
        <Grid item xs={12} md={0.4}>
          <Menu
            places={filteredPlaces.length ? filteredPlaces : places}
            childClicked={childClicked}
            isLoading={isLoading}
            type={type}
            setType={setType}
            rating={rating}
            setRating={setRating}
          />
        </Grid>
        <Grid item xs={12} md={11.6}>
          <Map
            setCoordinates={setCoordinates}
            setBounds={setBounds}
            coordinates={coordinates}
            places={filteredPlaces.length ? filteredPlaces : places}
            setChildClicked={setChildClicked}
          />
        </Grid>
      </Grid>
    </AppStoreProvider>
  );
};

export default App;
