import {
  AppBar,
  Box,
  InputBase,
  SvgIcon,
  Toolbar,
  Typography,
} from "@mui/material";
import { Autocomplete } from "@react-google-maps/api";
import SearchIcon from "@material-ui/icons/Search";
import useStyles from "./styles";
import { ICoordinate } from "../../App";
import { useState } from "react";
import { IWeather } from "../../shared/types/weather-types";

interface IProps {
  setCoordinates: React.Dispatch<React.SetStateAction<ICoordinate | null>>;
  weatherData: IWeather | null;
}

const Header = ({ setCoordinates, weatherData }: IProps) => {
  const classes = useStyles();
  const [autocomplete, setAutocomplete] = useState<any | null>(null);

  const onLoad = (AutoComplete: any) => setAutocomplete(AutoComplete);
  const onPlaceChanged = () => {
    const lat = autocomplete.getPlace().geometry.location.lat();
    const lng = autocomplete.getPlace().geometry.location.lng();
    setCoordinates({ lat, lng });
  };
  return (
    <>
      <AppBar position="static">
        <Toolbar className={classes.toolbar}>
          <SvgIcon sx={{ fontSize: 50 }}>
            <path d="M 10.195312 5.316406 C 10.121094 5.347656 10.011719 5.429688 9.957031 5.488281 C 9.898438 5.550781 8.152344 8.335938 6.066406 11.671875 L 2.273438 17.742188 L 2.273438 18.007812 C 2.273438 18.296875 2.351562 18.449219 2.597656 18.628906 L 2.722656 18.726562 L 21.277344 18.726562 L 21.402344 18.628906 C 21.648438 18.449219 21.726562 18.296875 21.726562 18.007812 L 21.726562 17.742188 L 18.6875 13.007812 C 17.015625 10.402344 15.578125 8.207031 15.492188 8.125 C 15.214844 7.859375 14.785156 7.859375 14.507812 8.125 C 14.386719 8.246094 11.195312 13.296875 10.96875 13.730469 C 10.890625 13.890625 10.929688 14.253906 11.058594 14.433594 C 11.199219 14.628906 11.414062 14.734375 11.675781 14.738281 C 12.09375 14.738281 12.097656 14.734375 13.570312 12.359375 C 14.3125 11.171875 14.945312 10.171875 14.972656 10.140625 C 15.007812 10.097656 15.59375 10.972656 17.3125 13.644531 C 18.570312 15.609375 19.59375 17.21875 19.585938 17.230469 C 19.570312 17.242188 16.144531 17.246094 11.96875 17.242188 L 4.367188 17.226562 L 7.421875 12.34375 C 9.101562 9.652344 10.484375 7.453125 10.5 7.453125 C 10.515625 7.453125 10.753906 7.820312 11.03125 8.257812 C 11.640625 9.238281 11.609375 9.195312 11.8125 9.324219 C 12.347656 9.648438 13.0625 9.113281 12.894531 8.507812 C 12.851562 8.34375 11.226562 5.699219 11.042969 5.488281 C 10.847656 5.265625 10.480469 5.1875 10.195312 5.316406 Z M 10.195312 5.316406" />
          </SvgIcon>
          <Box display="flex">
            <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
              <Box className={classes.search}>
                <Box className={classes.searchIcon}>
                  <SearchIcon />
                </Box>
                <InputBase
                  placeholder="Search..."
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                />
              </Box>
            </Autocomplete>
          </Box>
          {weatherData && (
            <Box className={classes.weather}>
              <Typography>{Math.round(weatherData.main.temp)}°C</Typography>
              <img
                src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
                alt="weather"
              />
            </Box>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
