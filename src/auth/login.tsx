import React, { useEffect } from "react";
import { useFormik } from "formik";
import yup from "yup";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import { basicLogin } from "./actions";
import { useStateSelector } from "src/reducers";
import "./index.scss";
import { Alert } from "@material-ui/lab";
import { phoneRegExp } from "src/utils/constants";
import HideMe from "./../common/useFooter";

export const Login = () => {
  let history = useHistory();
  const { isLoading, isLoggedIn, isLoginError } = useStateSelector(
    ({ authState }) => authState
  );
  const dispatch = useDispatch();
  const validationSchema: any = yup.object({
    mobileNumber: yup
      .string()
      .matches(phoneRegExp, "Phone number is not valid"),
    password: yup.string().required(),
  });
  const formik = useFormik({
    initialValues: {
      password: "",
      mobileNumber: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      dispatch(basicLogin(values));
    },
  });

  useEffect(() => {
    isLoggedIn && history.push("/");
  }, [isLoggedIn]);

  return (
    <Grid container component="main" className="root login">
      <Grid item xs={12} sm={12} md={12} className="image" />
      <Grid
        item
        xs={12}
        sm={12}
        md={4}
        component={Paper}
        className="container center-position"
      >
        <div className="paper">
          <Avatar className="avatar">
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" className="heading">
            Sign in
          </Typography>
          <Box color="text.primary">
            <form onSubmit={formik.handleSubmit}>
              <TextField
                fullWidth
                variant="filled"
                margin="normal"
                id="mobileNumber"
                name="mobileNumber"
                label="Mobile Number"
                className="input-style"
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
                margin="normal"
                variant="filled"
                id="password"
                className="input-style"
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
                className="submit"
                variant="contained"
                fullWidth
                disabled={isLoading}
                type="submit"
              >
                Submit
              </Button>
              <Grid container>
                <Grid item>
                  <Link
                    href="#"
                    variant="body2"
                    onClick={() => {
                      history.push("/signup");
                    }}
                  >
                    Don't have an account? Sign Up
                  </Link>
                </Grid>
              </Grid>
            </form>
            <br></br>
            <br></br>
            <HideMe visible={isLoading} duration={0}>
              <Alert severity="info">Loading</Alert>
            </HideMe>
            <HideMe visible={isLoginError} duration={2000}>
              <Alert severity="error">{isLoginError}</Alert>
            </HideMe>
            <br></br>
            <br></br>
          </Box>
        </div>
      </Grid>
    </Grid>
  );
};
