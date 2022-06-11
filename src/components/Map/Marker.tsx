import { Box, Paper, Typography, Rating, useMediaQuery } from "@mui/material";
import { Place } from "../../shared/types/place-types";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import useStyles from "./styles";

interface IMarker extends Omit<Place, "longitude" | "latitude"> {
  lng: number;
  lat: number;
}

const defaultImage: string = process.env.REACT_APP_DEFAULT_IMAGE_URL as string;

const Marker = (place: IMarker) => {
  const classes = useStyles();
  const isDesktop = useMediaQuery("(min-width:600px");
  return (
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
};

export default Marker;
