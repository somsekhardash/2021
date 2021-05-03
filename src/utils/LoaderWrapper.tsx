import React from "react";
import { Backdrop, CircularProgress, makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  backdrop: {
    zIndex: 1,
    color: "#fff",
  },
});

function Loader() {
  const classes = useStyles();
  return (
    <Backdrop open={true} className={classes.backdrop}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}

const withLoading = (WrappedComponent) => {
  return (props = {} as any) => {
    if (props.isLoading) {
      return <Loader />;
    }
    return <WrappedComponent {...props} />;
  };
};

export default withLoading;
