import { Skeleton } from "@material-ui/lab";
import React from "react";

const CardLoader = () => {
  return (
    <>
      <Skeleton variant="text" className="full-width" />
      <Skeleton variant="circle" width={40} height={40} />
      <Skeleton variant="rect" className="full-width" height={118} />
    </>
  );
};

export default CardLoader;
