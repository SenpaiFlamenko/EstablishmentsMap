import {
  Box,
  Typography,
  Button,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Chip,
  Rating,
} from "@mui/material";

import LocationOnIcon from "@material-ui/icons/LocationOn";
import PhoneIcon from "@material-ui/icons/Phone";

import useStyles from "./styles";

import { Place } from "../../shared/types/place-types";

interface IProps {
  place: Place;
  selected: boolean;
  refProp: any;
}

const PlaceDetails = ({ place, selected, refProp }: IProps) => {
  const classes = useStyles();
  const {
    name,
    photo,
    price_level,
    ranking,
    awards,
    cuisine,
    address,
    phone,
    web_url,
    website,
    rating,
    num_reviews,
  } = place;

  const defaultImage: string = process.env
    .REACT_APP_DEFAULT_IMAGE_URL as string;

  if (selected) {
    refProp?.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  return (
    <>
      {name && (
        <Card elevation={6}>
          <CardMedia
            style={{ height: 350 }}
            image={photo ? photo.images.large.url : defaultImage}
            title={name}
          />
          <CardContent>
            <Typography gutterBottom variant="h5">
              {name}
            </Typography>
            <Box display="flex" justifyContent="space-between">
              <Rating value={Number(rating ?? 0)} precision={0.5} readOnly />
              <Typography gutterBottom variant="subtitle1">
                out of {num_reviews} reviews
              </Typography>
            </Box>
            <Box display="flex" justifyContent="space-between">
              <Typography variant="subtitle1">Price</Typography>
              <Typography gutterBottom variant="subtitle1">
                {price_level}
              </Typography>
            </Box>
            <Box display="flex" justifyContent="space-between">
              <Typography variant="subtitle1">Ranking</Typography>
              <Typography gutterBottom variant="subtitle1">
                {ranking}
              </Typography>
            </Box>
            {awards?.map((award) => (
              <Box
                key={award.display_name}
                my={1}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <img src={award.images.small} alt={award.display_name} />
                <Typography variant="subtitle2" color="textSecondary">
                  {award.display_name}
                </Typography>
              </Box>
            ))}
            {cuisine?.map(({ name }) => (
              <Chip
                key={name}
                size="small"
                label={name}
                className={classes.chip}
              />
            ))}
            {address && (
              <Typography
                gutterBottom
                variant="subtitle2"
                color="textSecondary"
                className={classes.subtitle}
              >
                <LocationOnIcon />
                {address}
              </Typography>
            )}
            {phone && (
              <Typography
                gutterBottom
                variant="subtitle2"
                color="textSecondary"
                className={classes.spacing}
              >
                <PhoneIcon />
                {phone}
              </Typography>
            )}
            <CardActions>
              {web_url && (
                <Button
                  size="small"
                  color="primary"
                  onClick={() => window.open(web_url, "_blanc")}
                >
                  Trip Advisor
                </Button>
              )}
              {website && (
                <Button
                  size="small"
                  color="primary"
                  onClick={() => window.open(website, "_blanc")}
                >
                  Website
                </Button>
              )}
            </CardActions>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default PlaceDetails;
