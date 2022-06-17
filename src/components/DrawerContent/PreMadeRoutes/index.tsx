import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  IconButton,
  CardHeader,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import React, {
  useEffect,
  useState,
  FunctionComponent,
  useCallback,
} from "react";
import { readData, removeData } from "../../db";
import { buildDirections } from "../../Map/Map";
import { useAppContext } from "../../../store";
import { showAddButton } from "../../../store/actions";

const defaultImage: string = process.env.REACT_APP_DEFAULT_IMAGE_URL as string;

interface IProps {
  setPlaces: React.Dispatch<React.SetStateAction<any[]>>;
}

const PreMadeRoutes: FunctionComponent<IProps> = (props) => {
  const { setPlaces } = props;
  const [routePlaces, setRoutePlaces] = useState<any>();

  const { dispatch } = useAppContext();

  const getPlaces = useCallback(async () => {
    const places = await readData();
    setRoutePlaces(places);
  }, []);

  useEffect(() => {
    getPlaces();
  }, [getPlaces]);

  const buildRoute = (route: any) => {
    dispatch(showAddButton(false));
    buildDirections(route);
  };

  return (
    <Box style={{ overflowY: "auto", height: "100%" }}>
      {routePlaces?.map(
        (route: any, i: number) =>
          route.name && (
            <Card sx={{ maxWidth: 345 }} key={i}>
              <CardHeader
                action={
                  <IconButton
                    aria-label="settings"
                    onClick={() => {
                      removeData(route.name);
                      setRoutePlaces((prev: any) =>
                        prev.filter((r: any) => r.name !== route.name)
                      );
                    }}
                  >
                    <ClearIcon />
                  </IconButton>
                }
                // title={name}
              />
              <CardMedia
                component="img"
                style={{ height: 350 }}
                image={
                  route.places[0].photo.images.large.url
                    ? route.places[0].photo.images.large.url
                    : defaultImage
                }
                alt={route.places[0].name}
              />

              <CardContent>
                <Typography gutterBottom variant="h5">
                  {`Route from ${route.places[0].name} to 
                  ${route.places[route.places.length - 1].name}`}
                </Typography>
                <Button
                  onClick={() => {
                    buildRoute(route.places);
                    setPlaces(route.places);
                  }}
                >
                  Build route
                </Button>
              </CardContent>
            </Card>
          )
      )}
    </Box>
  );
};

export default PreMadeRoutes;
