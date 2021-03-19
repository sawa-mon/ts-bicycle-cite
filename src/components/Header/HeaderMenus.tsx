import React from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/Icon";
import MenuIcon from "@material-ui/icons/Menu";

type HeaderMenusProps = {
  handleDrawerToggle: (
    event: {}
  ) => void;
};

const useStyles = makeStyles((theme: Theme) => ({
  button: {
    marginRight: theme.spacing(2),
  },
  menuButton: {
    marginRight: theme.spacing(1),
  },
}));

export const HeaderMenus: React.FC<HeaderMenusProps> = (props) => {
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
