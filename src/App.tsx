import React, { useEffect, useState } from "react";
import { CssBaseline, Grid } from "@mui/material";
import Header from "./components/Header/Header";
import List from "./components/List/List";
import Map from "./components/Map/Map";
import { getPlacesData } from "./api";

export interface ICoordinate {
  lat: number;
  lng: number;
}

export interface IBounds {
  ne: ICoordinate;
  sw: ICoordinate;
}

export type SelectablePlaces = "restaurants" | "hotels" | "attractions";
export type SelectableRating = 0 | 3.0 | 4.0 | 4.5;

const App = () => {
  const [places, setPlaces] = useState<any[]>([]);
  const [coordinates, setCoordinates] = useState<ICoordinate | null>(null);
  const [bounds, setBounds] = useState<IBounds | null>(null);
  const [childClicked, setChildClicked] = useState<number>(0);
  const [filteredPlaces, setFilteredPlaces] = useState<any[]>([]);

  const [isLoading, setIsLoading] = useState(false);

  const [type, setType] = useState<SelectablePlaces>("restaurants");
  const [rating, setRating] = useState<SelectableRating>(3.0);

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
    getPlacesData(type, ne, sw).then((data) => {
      setPlaces(data);
      setIsLoading(false);
    });
  }, [bounds, type]);

  useEffect(() => {
    const filteredPlaces = places.filter((place) => place.rating >= rating);
    setFilteredPlaces(filteredPlaces);
  }, [rating, places]);

  return (
    <>
      <CssBaseline />
      <Header setCoordinates={setCoordinates} />
      <Grid container spacing={2} style={{ width: "100%" }}>
        <Grid item xs={12} md={4}>
          <List
            places={filteredPlaces.length ? filteredPlaces : places}
            childClicked={childClicked}
            isLoading={isLoading}
            type={type}
            setType={setType}
            rating={rating}
            setRating={setRating}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <Map
            setCoordinates={setCoordinates}
            setBounds={setBounds}
            coordinates={coordinates}
            places={filteredPlaces.length ? filteredPlaces : places}
            setChildClicked={setChildClicked}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default App;
