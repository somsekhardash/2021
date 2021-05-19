import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import yup from "yup";
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
import { Redirect, useHistory } from "react-router-dom";
import withLoading from "src/utils/LoaderWrapper";
import { Link, Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { useStateSelector } from "src/reducers";

const validationSchema: any = yup.object({
  userName: yup.string().required(),
  mobileNumber: yup.string().required(),
  password: yup.string().required(),
});

const SubmitButton = () => {
  return (
    <Button
      color="primary"
      variant="contained"
      fullWidth
      type="submit"
      className="submit"
    >
      Submit
    </Button>
  );
};

const SubmitWithLoading = withLoading(SubmitButton);

export const Signup = () => {
  const [is1Loading, setis1Loading] = useState(false);
  const { isLoading, isLoggedIn, isLoginError } = useStateSelector(
    ({ authState }) => authState
  );
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
      setis1Loading(true);
      dispatch(basicSignup(values));
    },
  });

  useEffect(() => {
    if (isLoggedIn) {
      setis1Loading(false);
      setTimeout(() => {
        history.push("/login");
      }, 2000);
    }
  }, [isLoggedIn]);

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
          {formik.values.userName ? (
            <Avatar
              className="avatar"
              alt={formik.values.userName}
              src={`https://api.multiavatar.com/${formik.values.userName}.svg`}
            />
          ) : (
            <Avatar className="avatar">
              <LockOutlinedIcon />
            </Avatar>
          )}

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
              <SubmitWithLoading isLoading={isLoading} />
              <Grid container>
                <Grid item>
                  <Link
                    href="#"
                    variant="body2"
                    className="move-to-login"
                    onClick={() => {
                      history.push("/login");
                    }}
                  >
                    Lets go to login
                  </Link>
                </Grid>
              </Grid>
            </form>
          </Box>
        </div>
      </Grid>
      <Grid item xs={12} sm={12} md={12} className="image" />
      <Snackbar open={isLoggedIn} autoHideDuration={1000}>
        <Alert severity="success">You are successfully registered !!</Alert>
      </Snackbar>
      <Snackbar open={!!isLoginError} autoHideDuration={1000}>
        <Alert severity="error">{isLoginError}</Alert>
      </Snackbar>
    </Grid>
  );
};
