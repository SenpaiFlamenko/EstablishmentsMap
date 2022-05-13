import { AppBar, Box, InputBase, Toolbar, Typography } from "@mui/material";
// import { Autocomplete } from "@react-google-maps/api";
import SearchIcon from "@material-ui/icons/Search";
import useStyles from "./styles";
import { ICoordinate } from "../../App";

interface IProps {
  setCoordinates: React.Dispatch<React.SetStateAction<ICoordinate | null>>;
}

const Header = ({ setCoordinates }: IProps) => {
  const classes = useStyles();
  // const [autocomplete, setAutocomplete] = useState();

  // const onLoad = (AutoC: any) => setAutocomplete(AutoC);
  // const onPlaceChanged = () => {
  //   const lat = autocomplete.getPlace().geometry.location.lat();
  //   const lng = autocomplete.getPlace().geometry.location.lng();
  //   setCoordinates({ lat, lng });
  // };
  return (
    <>
      <AppBar position="static">
        <Toolbar className={classes.toolbar}>
          <Typography variant="h5" className={classes.title}>
            Header
          </Typography>
          <Box display="flex">
            {/* <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}> */}
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
            {/* </Autocomplete> */}
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
