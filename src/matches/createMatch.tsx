import React from "react";
import { Formik, useFormik } from "formik";
import yup from "yup";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import Switch from "@material-ui/core/Switch";
import { MenuItem } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import { Autocomplete } from "@material-ui/lab";
import "./edit-match.scss";
import moment from "moment";
import { useDispatch } from "react-redux";
import {
  onSelectTournament,
  updateMatch,
  onCreateMatch,
  onSelectMatch,
} from "src/tournaments/actions";
import { allMatches } from "src/common/allMatches";

export const CreateMatch = ({
  selectedTournament,
  selectedMatch,
  title,
}: any) => {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [team1, setTeam1] = React.useState(selectedMatch?.team1 || "");
  const [team2, setTeam2] = React.useState(selectedMatch?.team2 || "");
  const { matches } = allMatches();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    dispatch(onSelectMatch({ selectedMatch: null }));
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
    team1Squard: yup.array(yup.string()),
    team2Squard: yup.array(yup.string()),
    isStarted: yup.bool(),
  });
  const formik = {
    initialValues: {
      tournamentId: selectedTournament?._id || "",
      _id: selectedMatch?._id || "",
      team1: team1,
      team2: team2,
      time:
        moment(selectedMatch?.time).format("yyyy-MM-DDThh:mm") ||
        moment().format("yyyy-MM-DDThh:mm"),
      venue: selectedMatch?.venue || "",
      winner: selectedMatch?.winner || "",
      team1Squard: selectedMatch?.team1Squard || [],
      team2Squard: selectedMatch?.team2Squard || [],
      isStarted: false,
    },
  };

  return (
    <div className="create-match">
      <Button
        variant="outlined"
        style={{ marginTop: 20, marginBottom: 20 }}
        color="primary"
        onClick={handleClickOpen}
      >
        Create Match
      </Button>
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
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              dispatch(onCreateMatch(values));
            }, 1000);
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
              {/* <TextField
                fullWidth
                id="team1"
                name="team1"
                label="team1"
                onChange={props.handleChange}
                value={props.values.team1}
              /> */}
              {/* <TextField
                fullWidth
                id="team2"
                name="team2"
                label="team2"
                onChange={props.handleChange}
                value={props.values.team2}
              /> */}

              <Autocomplete
                id="team1"
                freeSolo
                options={matches}
                style={{ width: 300 }}
                value={props.values.team1}
                onInputChange={(event: any, value: any) => {
                  props.setFieldValue("team1", value);
                }}
                renderInput={(params) => (
                  <TextField {...params} label="team1" />
                )}
              />

              <Autocomplete
                id="team2"
                freeSolo
                options={matches}
                style={{ width: 300 }}
                value={props.values.team2}
                onInputChange={(event: any, value: any) => {
                  props.setFieldValue("team2", value);
                }}
                renderInput={(params) => (
                  <TextField {...params} label="team2" />
                )}
              />

              {/* <Select
                labelId="team1"
                id="team1"
                value={props.values.team1}
                onChange={(item) => {
                  props.setFieldValue("team1", item.target.value);
                }}
              >
                {matches.map((item: any, i: number) => (
                  <MenuItem key={i} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </Select> */}
              {/* <Select
                labelId="team2"
                id="team2"
                value={props.values.team2}
                onChange={(item) => {
                  props.setFieldValue("team2", item.target.value);
                }}
              >
                {matches.map((item: any, i: number) => (
                  <MenuItem key={i} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </Select> */}
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
              <div>
                <span>Is Started :</span>
                <Switch
                  checked={props.values.isStarted}
                  onChange={props.handleChange}
                  name="isStarted"
                  inputProps={{ "aria-label": "secondary checkbox" }}
                />
              </div>
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
