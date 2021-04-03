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

// import React from "react";
// function WithLoading(Component) {
//   return function WihLoadingComponent({ isLoading, ...props }) {
//     if (!isLoading) return <Component {...props} />;
//     return <p>Hold on, fetching data might take some time.</p>;
//   };
// }
// export default WithLoading;
