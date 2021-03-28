import React from "react";
import { useDispatch } from "react-redux";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import * as yup from "yup";
import { useFormik } from "formik";
import { createTournament, updateUserCall } from "Src/tournaments/actions";
import { Signup } from "Src/auth/signup";
import EditIcon from "@material-ui/icons/Edit";
import { IconButton } from "@material-ui/core";

export const EditUser = ({ user }: any) => {
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const validationSchema: any = yup.object({
    userName: yup.string().required(),
    password: yup.string().required(),
  });
  const formik = useFormik({
    initialValues: {
      userName: user.userName || "",
      password: user.password || "",
      mobileNumber: user.mobileNumber,
      userId: user._id,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
      dispatch(updateUserCall(values));
      handleClose();
    },
  });
  return (
    <div>
      <IconButton aria-label="delete" onClick={handleClickOpen}>
        <EditIcon />
      </IconButton>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Edit User</DialogTitle>
        <form onSubmit={formik.handleSubmit}>
          <DialogContent>
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
              error={formik.touched.userName && Boolean(formik.errors.userName)}
              helperText={formik.touched.userName && formik.errors.userName}
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
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
          </DialogContent>
          <Button
            color="primary"
            variant="contained"
            fullWidth
            type="submit"
            className="submit"
          >
            Submit
          </Button>
          <br></br>
          <br></br>
        </form>
      </Dialog>
    </div>
  );
};
