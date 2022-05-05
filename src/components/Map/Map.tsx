import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import { Box, Paper, useMediaQuery, Typography, Rating } from "@mui/material";
import GoogleMapReact from "google-map-react";
import { ICoordinate, IBounds } from "../../App";
import { Place } from "../../shared/types/place-types";
import useStyles from "./styles";

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
          <Typography variant="subtitle2" gutterBottom>
            {place.name}
          </Typography>
          <img
            className={classes.pointer}
            src={
              place.photo
                ? place.photo.images.large.url
                : "https://media.timeout.com/images/105825245/750/422/image.jpg"
            }
            alt={place.name}
          />
          <Rating size="small" value={Number(place.rating ?? 0)} readOnly />
        </Paper>
      )}
    </Box>
  );

  return (
    <Box className={classes.mapContainer}>
      {coordinates && (
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyAdio8MeFCaEl0rbZcoA5LtJsor47K9umk" }}
          defaultCenter={defaultCenter}
          center={coordinates}
          defaultZoom={14}
          margin={[50, 50, 50, 50]}
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
