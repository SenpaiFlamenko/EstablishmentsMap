import { Button, ButtonGroup, Drawer, Paper } from "@mui/material";
import { Hotel, Restaurant, Attractions, Room, Map } from "@mui/icons-material";
import useStyles from "./styles";
import React, { useState } from "react";
import List from "../List/List";

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
        elevation={1}
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
            sx={{ padding: `${bTopBotPadding}vh 0 ${bTopBotPadding}vh 0` }}
            onClick={toggleDrawer("left", true)}
          >
            <Hotel sx={{ fontSize: iconSize }} />
          </Button>
          <Button
            sx={{ padding: `${bTopBotPadding}vh 0 ${bTopBotPadding}vh 0` }}
          >
            <Restaurant sx={{ fontSize: iconSize }} />
          </Button>
          <Button
            sx={{ padding: `${bTopBotPadding}vh 0 ${bTopBotPadding}vh 0` }}
          >
            <Attractions sx={{ fontSize: iconSize }} />
          </Button>
          <Button
            sx={{ padding: `${bTopBotPadding}vh 0 ${bTopBotPadding}vh 0` }}
          >
            <Room sx={{ fontSize: iconSize }} />
          </Button>
          <Button
            sx={{ padding: `${bTopBotPadding}vh 0 ${bTopBotPadding}vh 0` }}
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
          onClose={toggleDrawer("left", false)}
          sx={{ backgroundColor: "black" }}
        >
          <List {...props} />
        </Drawer>
      </React.Fragment>
    </>
  );
};
export default Menu;
