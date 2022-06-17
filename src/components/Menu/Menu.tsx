import { Button, ButtonGroup, Drawer, Paper } from "@mui/material";
import { Hotel, Restaurant, Attractions, Room, Map } from "@mui/icons-material";
import useStyles from "./styles";
import React, { useState } from "react";
import DrawerContent from "../DrawerContent/DrawerContent";
import { SelectablePlaces } from "../../App";
import { useAppContext } from "../../store";
import { showAddButton } from "../../store/actions";

export type SelectableRoutes = "establishments" | "pre-made" | "build";

const Menu = (props: any) => {
  const classes = useStyles();
  const [drawerState, setDrawerState] = useState<boolean>(false);
  const [directionsType, setDirectionsType] = useState<SelectableRoutes>();

  const { dispatch } = useAppContext();

  const iconSize = 38;
  const bTopBotPadding = 1.5;
  const handleContentUpdate =
    (type: SelectablePlaces) =>
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      if (props.type === type) {
        setDrawerState(false);
        props.setType(undefined);
        return;
      }
      setDrawerState(true);
      dispatch(showAddButton(true));
      props.setType(type);
      setDirectionsType("establishments");
    };

  return (
    <>
      <Paper
        className={classes.root}
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        variant="outlined"
        square
      >
        <ButtonGroup
          orientation="vertical"
          aria-label="vertical outlined button group"
          variant="text"
          size="large"
          fullWidth={true}
          style={{ position: "absolute" }}
          sx={{ borderRadius: 0 }}
          className={classes.buttonGroup}
        >
          <Button
            sx={{ padding: `${bTopBotPadding}vh` }}
            onClick={handleContentUpdate("hotels")}
          >
            <Hotel sx={{ fontSize: iconSize }} />
          </Button>
          <Button
            sx={{ padding: `${bTopBotPadding}vh` }}
            onClick={handleContentUpdate("restaurants")}
          >
            <Restaurant sx={{ fontSize: iconSize }} />
          </Button>
          <Button
            sx={{ padding: `${bTopBotPadding}vh` }}
            onClick={handleContentUpdate("attractions")}
          >
            <Attractions sx={{ fontSize: iconSize }} />
          </Button>
          <Button
            sx={{ padding: `${bTopBotPadding}vh` }}
            onClick={() => {
              setDirectionsType("build");
              props.setType(undefined);
              if (directionsType === "build") {
                setDrawerState(false);
                setDirectionsType(undefined);
                return;
              }
              setDrawerState(true);
            }}
          >
            <Room sx={{ fontSize: iconSize }} />
          </Button>
          <Button
            sx={{ padding: `${bTopBotPadding}vh` }}
            onClick={() => {
              setDirectionsType("pre-made");
              props.setType(undefined);
              if (directionsType === "pre-made") {
                setDrawerState(false);
                setDirectionsType(undefined);
                return;
              }
              setDrawerState(true);
            }}
          >
            <Map sx={{ fontSize: iconSize }} />
          </Button>
        </ButtonGroup>
      </Paper>
      <React.Fragment key="left">
        <Drawer
          anchor="left"
          variant="persistent"
          open={drawerState}
          onClose={() => setDrawerState(false)}
          sx={{ backgroundColor: "black" }}
        >
          <DrawerContent {...props} contentType={directionsType} />
        </Drawer>
      </React.Fragment>
    </>
  );
};
export default Menu;
