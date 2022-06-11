import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    marginBottom: "30px",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  loading: {
    height: "600px",
    width: "35vw",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    paddingTop: "64px",
    paddingLeft: "3.3333vw",
    maxWidth: "35vw",
    overflow: "hidden",
  },
  content: {
    height: "81vh",
    overflow: "auto",
    padding: "0 15px",
  },
}));
