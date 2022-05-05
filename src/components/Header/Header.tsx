import { AppBar, Box, InputBase, Toolbar, Typography } from "@mui/material";
import { Search } from "@material-ui/icons";
import SearchIcon from "@material-ui/icons/Search";
import React from "react";
import useStyles from "./styles";

const Header = () => {
  const classes = useStyles();
  return (
    <>
      <AppBar position="static">
        <Toolbar className={classes.toolbar}>
          <Typography variant="h5" className={classes.title}>
            Header
          </Typography>
          <Box className={classes.search}>
            <Box className={classes.searchIcon}>
              <SearchIcon />
            </Box>
            <InputBase
              placeholder="Search..."
              classes={{ root: classes.inputRoot, input: classes.inputInput }}
            />
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
