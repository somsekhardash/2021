import { Backdrop, CircularProgress } from "@material-ui/core";
import React from "react";

export default function Loader() {
  return (
    <Backdrop open={true} className="backdrop">
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}
