import { Box } from "@mui/material";
import GoogleMapReact from "google-map-react";
import { ICoordinate, IBounds } from "../../App";
import { Place } from "../../shared/types/place-types";
import useStyles from "./styles";
import mapStyles from "./mapStyles";
import Marker from "./Marker";

interface IProps {
  setCoordinates: React.Dispatch<React.SetStateAction<ICoordinate | null>>;
  setBounds: React.Dispatch<React.SetStateAction<IBounds | null>>;
  setChildClicked: React.Dispatch<React.SetStateAction<number>>;
  coordinates: ICoordinate | null;
  places: Place[];
}

const mapAPI: string = process.env.REACT_APP_GOOGLE_MAPS_API_KEY as string;
const defaultCenter = { lat: 48.621025, lng: 22.288229 };
const directionsService = new google.maps.DirectionsService();
const directionsRenderer = new google.maps.DirectionsRenderer({
  preserveViewport: true,
  suppressMarkers: true,
});

export const buildDirections = (route: any[]) => {
  const routesConfig: google.maps.DirectionsRequest = {
    origin: { lat: Number(route[0].lat), lng: Number(route[0].lng) },
    destination: {
      lat: Number(route[route.length - 1].lat),
      lng: Number(route[route.length - 1].lng),
    },
    optimizeWaypoints: true,
    travelMode: google.maps.TravelMode.DRIVING,
  };
  if (route.length > 2) {
    routesConfig.waypoints = [];
    for (let i = 0; i < route.length; i++) {
      if (!i && i + 1 === route.length) continue;
      const { lng, lat } = route[i];
      routesConfig.waypoints.push({
        location: new google.maps.LatLng(+lat, +lng),
      });
    }
  }

  directionsService.route(routesConfig, (result, status) => {
    if (status === google.maps.DirectionsStatus.OK && result) {
      directionsRenderer.setDirections(result);
    }
  });
};

const Map = ({
  setCoordinates,
  setBounds,
  setChildClicked,
  coordinates,
  places,
}: IProps) => {
  const classes = useStyles();

  const apiIsLoaded = (map: any, maps: any) => {
    if (map) {
      directionsRenderer.setMap(map);
    }
  };

  return (
    <Box className={classes.mapContainer}>
      {coordinates && (
        <GoogleMapReact
          bootstrapURLKeys={{ key: mapAPI }}
          defaultCenter={defaultCenter}
          center={coordinates}
          defaultZoom={14}
          options={{ styles: mapStyles }}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps }) => apiIsLoaded(map, maps)}
          onChange={(e) => {
            setCoordinates({ lat: e.center.lat, lng: e.center.lng });
            setBounds({
              ne: e.marginBounds.ne,
              sw: e.marginBounds.sw,
            });
          }}
          onChildClick={(child) => {
            setChildClicked(child);
          }}
        >
          {places?.map(
            (place, i) =>
              place.name && (
                <Marker
                  lat={place.latitude}
                  lng={place.longitude}
                  key={i}
                  {...place}
                />
              )
          )}
        </GoogleMapReact>
      )}
    </Box>
  );
};

export default Map;
