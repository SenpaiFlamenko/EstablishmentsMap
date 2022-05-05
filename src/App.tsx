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

const App = () => {
  const [places, setPlaces] = useState<any[]>([]);
  const [coordinates, setCoordinates] = useState<ICoordinate | null>(null);
  const [bounds, setBounds] = useState<IBounds | null>(null);
  const [childClicked, setChildClicked] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);

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
    getPlacesData(ne, sw).then((data) => {
      setPlaces(data);
      setIsLoading(false);
    });
  }, [bounds]);
  return (
    <>
      <CssBaseline />
      <Header />
      <Grid container spacing={2} style={{ width: "100%" }}>
        <Grid item xs={12} md={4}>
          <List
            places={places}
            childClicked={childClicked}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <Map
            setCoordinates={setCoordinates}
            setBounds={setBounds}
            coordinates={coordinates}
            places={places}
            setChildClicked={setChildClicked}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default App;
