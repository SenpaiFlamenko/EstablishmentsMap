import { Button, ButtonGroup, Drawer, Paper } from "@mui/material";
import { Hotel, Restaurant, Attractions, Room, Map } from "@mui/icons-material";
import useStyles from "./styles";
import React, { useState } from "react";
import DrawerContent from "../DrawerContent/DrawerContent";

const Menu = (props: any) => {
  const classes = useStyles();
  const [drawerState, setDrawerState] = useState<boolean>(false);
  const iconSize = 38;
  const bTopBotPadding = 1.5;
  const toggleDrawer =
    (anchor: "left", open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }
      setDrawerState(!drawerState);
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
            onClick={(e) => {
              toggleDrawer("left", true)(e);
              props.setType("hotels");
            }}
          >
            <Hotel sx={{ fontSize: iconSize }} />
          </Button>
          <Button
            sx={{ padding: `${bTopBotPadding}vh` }}
            onClick={(e) => {
              toggleDrawer("left", true)(e);
              props.setType("restaurants");
            }}
          >
            <Restaurant sx={{ fontSize: iconSize }} />
          </Button>
          <Button
            sx={{ padding: `${bTopBotPadding}vh` }}
            onClick={(e) => {
              toggleDrawer("left", true)(e);
              props.setType("attractions");
            }}
          >
            <Attractions sx={{ fontSize: iconSize }} />
          </Button>
          <Button sx={{ padding: `${bTopBotPadding}vh` }}>
            <Room sx={{ fontSize: iconSize }} />
          </Button>
          <Button sx={{ padding: `${bTopBotPadding}vh` }}>
            <Map sx={{ fontSize: iconSize }} />
          </Button>
        </ButtonGroup>
      </Paper>
      <React.Fragment key="left">
        <Drawer
          anchor="left"
          variant="persistent"
          open={drawerState}
          onClose={toggleDrawer("left", false)}
          sx={{ backgroundColor: "black" }}
        >
          <DrawerContent {...props} />
        </Drawer>
      </React.Fragment>
    </>
  );
};
export default Menu;
