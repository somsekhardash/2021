import React from "react";
import { Formik, useFormik } from "formik";
import * as yup from "yup";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import Switch from "@material-ui/core/Switch";
import { MenuItem } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import "./edit-match.scss";
import moment from "moment";
import { useDispatch } from "react-redux";
import {
  onSelectTournament,
  updateMatch,
  onSelectMatch,
  onEditMatch,
} from "Src/tournaments/actions";
import { allMatches } from "Src/common/allMatches";

export const EditMatch = ({
  selectedTournament,
  selectedMatch,
  title,
}: any) => {
  const [open, setOpen] = React.useState(true);
  const [team1, setTeam1] = React.useState(selectedMatch?.team1 || "");
  const [team2, setTeam2] = React.useState(selectedMatch?.team2 || "");
  const dispatch = useDispatch();
  const { matches } = allMatches();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    dispatch(onEditMatch({ selectedMatch: null }));
    setOpen(false);
  };

  const validationSchema: any = yup.object({
    tournamentId: yup.string().required(),
    _id: yup.string(),
    team1: yup.string(),
    team2: yup.string(),
    time: yup.string(),
    venue: yup.string(),
    winner: yup.string(),
    isStarted: yup.bool(),
  });
  const formik = {
    initialValues: {
      tournamentId: selectedTournament?._id || "",
      _id: selectedMatch?._id || "",
      team1: team1,
      team2: team2,
      time: selectedMatch?.time
        ? moment(selectedMatch?.time).format("yyyy-MM-DDThh:mm")
        : moment().format("yyyy-MM-DDThh:mm"),
      venue: selectedMatch?.venue || "",
      winner: selectedMatch?.winner || "",
      team1Squard: selectedMatch?.team1Squard || [],
      team2Squard: selectedMatch?.team2Squard || [],
      isStarted: selectedMatch?.isStarted || false,
    },
  };

  return (
    <div className="edit-match">
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">{title}</DialogTitle>
        <Formik
          initialValues={formik.initialValues}
          validationSchema={validationSchema}
          onSubmit={(values: any, actions: any) => {
            console.log(values);
            dispatch(updateMatch(values));
          }}
        >
          {(props) => (
            <form className="form-body" onSubmit={props.handleSubmit}>
              <TextField
                fullWidth
                id="tournamentId"
                name="tournamentId"
                label="tournamentId"
                onChange={props.handleChange}
                value={props.values.tournamentId}
              />
              <TextField
                fullWidth
                id="_id"
                name="_id"
                label="matchId"
                onChange={props.handleChange}
                value={props.values._id}
              />
              <Select
                labelId="team1"
                id="team1"
                value={props.values.team1}
                onChange={(item) => {
                  props.setFieldValue("team1", item.target.value);
                }}
              >
                {matches.map((item: any, i: any) => (
                  <MenuItem key={i} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
              <Select
                labelId="team2"
                id="team2"
                value={props.values.team2}
                onChange={(item) => {
                  props.setFieldValue("team2", item.target.value);
                }}
              >
                {matches.map((item: any, i: any) => (
                  <MenuItem key={i} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
              <TextField
                id="time"
                label="time"
                type="datetime-local"
                defaultValue="2017-05-24T10:30"
                value={props.values.time}
                onChange={(item) => {
                  props.setFieldValue("time", item.target.value);
                }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                fullWidth
                id="venue"
                name="venue"
                label="venue"
                value={props.values.venue}
                onChange={props.handleChange}
                error={props.touched.venue && Boolean(props.errors.venue)}
                helperText={props.touched.venue && props.errors.venue}
              />
              <Select
                labelId="winner"
                id="winner"
                value={props.values.winner}
                onChange={(item) => {
                  props.setFieldValue("winner", item.target.value);
                }}
              >
                <MenuItem value={props.values.team1}>
                  {props.values.team1}
                </MenuItem>
                <MenuItem value={props.values.team2}>
                  {props.values.team2}
                </MenuItem>
              </Select>
              <Switch
                checked={props.values.isStarted}
                onChange={props.handleChange}
                name="isStarted"
                inputProps={{ "aria-label": "secondary checkbox" }}
              />
              <Button
                color="primary"
                variant="contained"
                fullWidth
                type="submit"
              >
                Submit
              </Button>
            </form>
          )}
        </Formik>
      </Dialog>
    </div>
  );
};
