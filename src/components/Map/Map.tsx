import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import { Box, Paper, useMediaQuery, Typography, Rating } from "@mui/material";
import GoogleMapReact from "google-map-react";
import { ICoordinate, IBounds } from "../../App";
import { Place } from "../../shared/types/place-types";
import useStyles from "./styles";
import mapStyles from "./mapStyles";

interface IProps {
  setCoordinates: React.Dispatch<React.SetStateAction<ICoordinate | null>>;
  setBounds: React.Dispatch<React.SetStateAction<IBounds | null>>;
  setChildClicked: React.Dispatch<React.SetStateAction<number>>;
  coordinates: ICoordinate | null;
  places: Place[];
}

interface IMarker extends Omit<Place, "longitude" | "latitude"> {
  lng: number;
  lat: number;
}

const mapAPI: string = process.env.REACT_APP_GOOGLE_MAPS_API_KEY as string;
const defaultImage: string = process.env.REACT_APP_DEFAULT_IMAGE_URL as string;

const Map = ({
  setCoordinates,
  setBounds,
  setChildClicked,
  coordinates,
  places,
}: IProps) => {
  const classes = useStyles();
  const isDesktop = useMediaQuery("(min-width:600px");
  const defaultCenter = { lat: 48.621025, lng: 22.288229 };

  const Marker = (place: IMarker) => (
    <Box className={classes.markerContainer}>
      {!isDesktop ? (
        <LocationOnOutlinedIcon color="primary" fontSize="large" />
      ) : (
        <Paper elevation={3} className={classes.paper}>
          <Box>
            <img
              className={classes.pointer}
              src={place.photo ? place.photo.images.large.url : defaultImage}
              alt={place.name}
            />
          </Box>
          <Typography variant="subtitle2" gutterBottom>
            {place.name}
          </Typography>
          <Rating
            size="small"
            value={Number(place.rating ?? 0)}
            precision={0.5}
            readOnly
          />
        </Paper>
      )}
    </Box>
  );

  const apiIsLoaded = (map: any, maps: any) => {
    if (map) {
      const directionsService = new google.maps.DirectionsService();
      const directionsRenderer = new google.maps.DirectionsRenderer({
        preserveViewport: true,
        suppressMarkers: true,
      });
      directionsRenderer.setMap(map);
      directionsService.route(
        {
          origin: defaultCenter,
          destination: { lat: 48.63091363023963, lng: 22.322595240464853 },
          travelMode: google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === google.maps.DirectionsStatus.OK && result) {
            // directionsRenderer.setDirections(result);
          }
        }
      );
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
          margin={[50, 50, 50, 50]}
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
