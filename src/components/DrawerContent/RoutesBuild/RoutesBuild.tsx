import {
  CardMedia,
  List,
  ListItem,
  ListItemButton,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Alert,
  Card,
  CardHeader,
  IconButton,
  Grid,
  Typography,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import React, { useState } from "react";
import { useAppContext } from "../../../store";
import { addData } from "../../db";
import { removePlace } from "../../../store/actions";

const defaultImage: string = process.env.REACT_APP_DEFAULT_IMAGE_URL as string;

function RoutesBuild() {
  const {
    dispatch,
    state: { places },
  } = useAppContext();

  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [routeName, setRouteName] = useState("");
  const saveRoute = () => {
    if (!routeName) {
      <Alert severity="warning">Can't create route without name!</Alert>;
      return;
    }
    if (places.length < 2 || places.length >= 10) {
      <Alert severity="error">
        Can't create route with less than 2 or more than 10 points!
      </Alert>;
      return;
    }
    addData({ name: routeName, places });
    handleClose();
  };
  return (
    <>
      <List
        style={{
          overflowY: "auto",
          height: "100%",
          paddingLeft: "1vw",
          paddingRight: "1vw",
        }}
      >
        <Typography variant="h4" style={{ paddingBottom: "1vh" }}>
          Routes creation
        </Typography>
        <Grid container spacing={3}>
          {places.map(({ photo, name, ...place }) => (
            <Grid item xs={12}>
              <Card
                elevation={6}
                style={{ paddingBottom: "1vh", width: "100%" }}
              >
                <CardHeader
                  action={
                    <IconButton
                      aria-label="settings"
                      onClick={() =>
                        dispatch(removePlace({ ...place, photo, name }))
                      }
                    >
                      <ClearIcon />
                    </IconButton>
                  }
                  title={name}
                />
                <CardMedia
                  style={{ height: 350 }}
                  image={photo ? photo.images.large.url : defaultImage}
                  title={name}
                  component="img"
                />
              </Card>
            </Grid>
          ))}
        </Grid>
        <ListItem>
          <ListItemButton onClick={handleClickOpen}>Save</ListItemButton>
        </ListItem>
      </List>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Enter route name</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Route name"
            fullWidth
            variant="standard"
            value={routeName}
            onChange={(e) => setRouteName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={saveRoute}>Save route</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default RoutesBuild;
