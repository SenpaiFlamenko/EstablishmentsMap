import {
  Box,
  CardMedia,
  CardContent,
  Typography,
  List,
  Collapse,
  ListItem,
  ListItemButton,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Alert,
} from "@mui/material";
import React, { useState } from "react";
import { useAppContext } from "../../../store";
import { addData } from "../../db";

const defaultImage: string = process.env.REACT_APP_DEFAULT_IMAGE_URL as string;

function RoutesBuild() {
  const {
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
    if (places.length < 2) {
      <Alert severity="error">
        Can't create route with less than 2 points!
      </Alert>;
      return;
    }
    addData({ name: routeName, places });
    handleClose();
  };
  return (
    // <Collapse in={open} timeout="auto" unmountOnExit>
    <>
      <List style={{ overflowY: "auto", height: "100%" }}>
        {places.map(({ photo, name }) => (
          <Box>
            <CardMedia
              style={{ height: 350 }}
              image={photo ? photo.images.large.url : defaultImage}
              title={name}
              component="img"
            />
            <CardContent>
              <Typography gutterBottom variant="h5">
                {name}
              </Typography>
            </CardContent>
          </Box>
        ))}
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
    // </Collapse>
  );
}

export default RoutesBuild;
