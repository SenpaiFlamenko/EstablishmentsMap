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

interface IProps {
  places: Place[];
  childClicked: number;
  isLoading: boolean;
  type: SelectablePlaces;
  rating: SelectableRating;
  setRating: React.Dispatch<React.SetStateAction<SelectableRating>>;
}

const List = ({
  places,
  childClicked,
  isLoading,
  type,
  rating,
  setRating,
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

  return (
    <Box className={classes.container}>
      {isLoading ? (
        <Box className={classes.loading}>
          <CircularProgress size="5rem" />
        </Box>
      ) : (
        <Box>
          <Typography variant="h4" style={{ textTransform: "capitalize" }}>
            {type}
          </Typography>
          <FormControl className={classes.formControl}>
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
      )}
    </Box>
  );
};

export default List;
