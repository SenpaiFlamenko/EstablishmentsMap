import {
  Box,
  Paper,
  Typography,
  Rating,
  useMediaQuery,
  IconButton,
} from "@mui/material";
import { Place } from "../../shared/types/place-types";
import useStyles from "./styles";
import { Add, LocationOnOutlined } from "@mui/icons-material";
import { useAppContext } from "../../store";
import { setPlace } from "../../store/actions";
export interface IMarker extends Omit<Place, "longitude" | "latitude"> {
  lng: number;
  lat: number;
}

const defaultImage: string = process.env.REACT_APP_DEFAULT_IMAGE_URL as string;

const Marker = (place: IMarker) => {
  const classes = useStyles();
  const simpleView = useMediaQuery("(min-width:600px");
  const {
    dispatch,
    state: { showAddButton },
  } = useAppContext();
  const addPlace = () => {
    dispatch(setPlace(place));
  };
  return (
    <Box className={classes.markerContainer}>
      {!simpleView ? (
        <LocationOnOutlined color="primary" fontSize="large" />
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
          {showAddButton && (
            <IconButton
              aria-label="delete"
              size="small"
              sx={{ borderRadius: 0 }}
              onClick={() => addPlace()}
            >
              <Add />
            </IconButton>
          )}
        </Paper>
      )}
    </Box>
  );
};

export default Marker;
