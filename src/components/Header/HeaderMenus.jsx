import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/Icon";
import MenuIcon from "@material-ui/icons/Menu";

const useStyles = makeStyles((theme) => ({
  button: {
    marginRight: theme.spacing(2),
  },
}));

export const HeaderMenus = (props) => {
  const classes = useStyles();

  return (
    <div>
      <IconButton
        className={classes.menuButton}
        onClick={(event) => props.handleDrawerToggle(event)}
      >
        <MenuIcon />
      </IconButton>
    </div>
  );
};
