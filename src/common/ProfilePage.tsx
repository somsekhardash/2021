import React, { useEffect, useState } from "react";
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
// import useStyles from "./style";
// import { basicSignup } from "./actions";
import { phoneRegExp } from "./../utils/constants";
// import "./index.scss";
import { Redirect, useHistory } from "react-router-dom";
import withLoading from "src/utils/LoaderWrapper";
import { Link, Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { useStateSelector } from "src/reducers";
import { updateUserCall } from "src/tournaments/actions";
import HideMe from "./../common/useFooter";
import { Header } from "./header";

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
      Save
    </Button>
  );
};

const SubmitWithLoading = withLoading(SubmitButton);

export const ProfilePage = () => {
  const { updateUserLoader, updateUserError, updateUserSuccess } =
    useStateSelector(({ TournamentState }) => TournamentState);

  const { data, isLoggedIn } = useStateSelector(({ authState }) => authState);

  const dispatch = useDispatch();
  let history = useHistory();
  const formik = useFormik({
    initialValues: {
      userName: data.userName,
      mobileNumber: data.mobileNumber,
      password: "",
      userId: data._id,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      dispatch(updateUserCall(values));
    },
  });

  useEffect(() => {
    if (!isLoggedIn) {
      history.push("/login");
    }
  }, [isLoggedIn]);

  return (
    <div>
      <Header />
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
              Edit Profile
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
                  disabled={true}
                  value={formik.values.mobileNumber}
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
                <SubmitWithLoading isLoading={updateUserLoader} />
              </form>
            </Box>
          </div>
        </Grid>
        <HideMe visible={updateUserSuccess} duration={0}>
          <Alert severity="success">{updateUserSuccess}</Alert>
        </HideMe>
        <HideMe visible={updateUserError} duration={0}>
          <Alert severity="error">{updateUserError}</Alert>
        </HideMe>
      </Grid>
      <div className="footer">
        <Button
          className="link"
          style={{ color: "white" }}
          onClick={() => history.goBack()}
        >
          Go Back
        </Button>
      </div>
    </div>
  );
};
