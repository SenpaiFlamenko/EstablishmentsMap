import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  CircularProgress,
} from "@mui/material";
import React, { createRef, useEffect, useState } from "react";
import useStyles from "./styles";
import PlaceDetails from "../PlaceDetails/PlaceDetails";
import { Place } from "../../shared/types/place-types";
import { SelectablePlaces, SelectableRating } from "../../App";
import { SelectableRoutes } from "../Menu/Menu";

interface IProps {
  places: Place[];
  childClicked: number;
  isLoading: boolean;
  type: SelectablePlaces;
  rating: SelectableRating;
  setRating: React.Dispatch<React.SetStateAction<SelectableRating>>;
  contentType: SelectableRoutes;
}

const DrawerContent = ({
  places,
  childClicked,
  isLoading,
  type,
  rating,
  setRating,
  contentType,
}: IProps) => {
  const classes = useStyles();
  const [elRefs, setElRefs] = useState([]);
  useEffect(() => {
    setElRefs((refs) =>
      Array(places?.length)
        .fill({})
        .map((_, i) => refs[i] || createRef())
    );
  }, [places]);

  const routes: { [key in SelectableRoutes]: React.ReactNode } = {
    content: (
      <Box>
        <Box className={classes.topBlock}>
          <Typography variant="h4" style={{ textTransform: "capitalize" }}>
            {type}
          </Typography>
          <FormControl
            variant="standard"
            sx={{ m: 1, minWidth: 120 }}
            className={classes.formControl}
          >
            <InputLabel>Rating</InputLabel>
            <Select
              value={rating}
              onChange={(e) => setRating(e.target.value as SelectableRating)}
            >
              <MenuItem value={0}>All</MenuItem>
              <MenuItem value={3.0}>Above 3.0</MenuItem>
              <MenuItem value={4.0}>Above 4.0</MenuItem>
              <MenuItem value={4.5}>Above 4.5</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Grid container spacing={3} className={classes.content}>
          {places &&
            places.map((place, i) => (
              <Grid ref={elRefs[i]} item key={i} xs={12}>
                <PlaceDetails
                  place={place}
                  selected={Number(childClicked) === i}
                  refProp={elRefs[i]}
                />
              </Grid>
            ))}
        </Grid>
      </Box>
    ),
    "pre-made": <Box>pre-made</Box>,
    build: <Box>build</Box>,
  };

  return (
    <Box className={classes.container}>
      {isLoading ? (
        <Box className={classes.loading}>
          <CircularProgress size="5rem" />
        </Box>
      ) : (
        routes[contentType]
      )}
    </Box>
  );
};

export default DrawerContent;
