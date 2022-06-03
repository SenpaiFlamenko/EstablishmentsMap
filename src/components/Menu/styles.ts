import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(() => ({
  root: {
    height: "100%",
    position: "relative",
  },
  buttonGroup: {
    display: "flex",
    justifyContent: "space-around",
    alightItems: "center",
  },
  button: {
    padding: "0 1vh 0 1vh",
  },
}));
