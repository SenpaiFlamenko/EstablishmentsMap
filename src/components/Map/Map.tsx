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

const Map = ({
  setCoordinates,
  setBounds,
  setChildClicked,
  coordinates,
  places,
}: IProps) => {
  const classes = useStyles();
  const defaultCenter = { lat: 48.621025, lng: 22.288229 };

  const apiIsLoaded = (map: any, maps: any) => {
    // if (map) {
    //   const directionsService = new google.maps.DirectionsService();
    //   const directionsRenderer = new google.maps.DirectionsRenderer({
    //     preserveViewport: true,
    //     suppressMarkers: true,
    //   });
    //   directionsRenderer.setMap(map);
    //   directionsService.route(
    //     {
    //       origin: defaultCenter,
    //       destination: { lat: 48.63091363023963, lng: 22.322595240464853 },
    //       travelMode: google.maps.TravelMode.DRIVING,
    //     },
    //     (result, status) => {
    //       if (status === google.maps.DirectionsStatus.OK && result) {
    //         directionsRenderer.setDirections(result);
    //       }
    //     }
    //   );
    // }
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
