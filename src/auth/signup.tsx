import React, { useState } from "react";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import useStyles from "./style";
import { basicSignup } from "./actions";
import { phoneRegExp } from "./../utils/constants";
import "./index.scss";
import { useHistory } from "react-router-dom";

const validationSchema: any = yup.object({
  userName: yup.string().required(),
  mobileNumber: yup.string().required(),
  password: yup.string().required(),
});

export const Signup = () => {
  const [isLoading, setisLoading] = useState(false);
  const dispatch = useDispatch();
  let history = useHistory();
  const formik = useFormik({
    initialValues: {
      userName: "",
      mobileNumber: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
      dispatch(basicSignup(values));
      setisLoading(true);
      history.push("/");
    },
  });

  return (
    <Grid container component="main" className="root signup login">
      <Grid
        item
        xs={12}
        sm={8}
        md={4}
        component={Paper}
        elevation={6}
        square
        className="container"
      >
        <div className="paper">
          <Avatar className="avatar">
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" className="heading">
            Sign up
          </Typography>
          <Box color="text.primary">
            <form onSubmit={formik.handleSubmit}>
              <TextField
                fullWidth
                variant="outlined"
                margin="normal"
                id="userName"
                name="userName"
                label="User Name"
                value={formik.values.userName}
                onChange={formik.handleChange}
                autoComplete="off"
                error={
                  formik.touched.userName && Boolean(formik.errors.userName)
                }
                helperText={formik.touched.userName && formik.errors.userName}
              />
              <TextField
                fullWidth
                variant="outlined"
                margin="normal"
                id="mobileNumber"
                name="mobileNumber"
                label="Mobile Number"
                autoComplete="off"
                type="tel"
                value={formik.values.mobileNumber}
                onChange={formik.handleChange}
                error={
                  formik.touched.mobileNumber &&
                  Boolean(formik.errors.mobileNumber)
                }
                helperText={
                  formik.touched.mobileNumber && formik.errors.mobileNumber
                }
              />
              <TextField
                fullWidth
                variant="outlined"
                margin="normal"
                id="password"
                name="password"
                label="Password"
                type="password"
                autoComplete="off"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
              />
              <Button
                color="primary"
                variant="contained"
                fullWidth
                type="submit"
                className="submit"
              >
                Submit
              </Button>
            </form>
          </Box>
        </div>
      </Grid>
      <Grid item xs={false} sm={4} md={8} className="image" />
    </Grid>
  );
};
