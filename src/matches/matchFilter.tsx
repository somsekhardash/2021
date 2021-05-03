import { Avatar, Chip, Switch } from "@material-ui/core";
import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { getAbbr } from "Src/utils/constants";
import { useDispatch } from "react-redux";
import { onFilterMatch } from "Src/tournaments/actions";
import { allMatches } from "Src/common/allMatches";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
  },
  chip: {
    margin: "5px 0",
    borderRadius: "0",
    justifyContent: "flex-start",
    width: "100%",
  },
  button: {
    display: "flex",
    flexDirection: "column",
    marginLeft: 10,
    alignItems: "center",
  },
});

export const MatchFilter = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { imageMap, matches } = allMatches();
  const [value, setValue] = React.useState([] as any);
  const [turboSearch, setTurboSearch] = React.useState(false);
  const handleClick = (e: any, team: any) => {
    const selectedTeamIndex = value.indexOf(team);
    if (selectedTeamIndex > -1) {
      const updatedValue = [
        ...value.slice(0, selectedTeamIndex),
        ...value.slice(selectedTeamIndex + 1),
      ];
      console.log(updatedValue);
      setValue([...updatedValue]);
    } else {
      setValue((arr: string) => [...arr, team]);
    }
  };

  useEffect(() => {
    dispatch(onFilterMatch({ team: value, turboSearch: turboSearch }));
  }, [value, turboSearch]);

  return (
    <div className={classes.root}>
      {matches.map((team: any, index: any) => {
        return (
          <Chip
            avatar={
              <Avatar alt={team} src={imageMap[getAbbr(team).toLowerCase()]} />
            }
            key={index}
            className={classes.chip}
            label={team}
            onClick={(e) => handleClick(e, team)}
            color={value.indexOf(team) > -1 ? "primary" : "default"}
          />
        );
      })}

      {!!matches.length && (
        <div className={classes.button}>
          <Switch
            checked={turboSearch}
            onChange={() => {
              setTurboSearch(!turboSearch);
            }}
            name="turboSearch"
            inputProps={{ "aria-label": "secondary checkbox" }}
          />
        </div>
      )}
    </div>
  );
};
