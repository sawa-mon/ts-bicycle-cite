import React, { useCallback, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { useDispatch, useSelector } from "react-redux";
import { getIsSignedIn } from "../../reducks/users/selectors";
import headerlogo from "../../assets/Images/headerlogo.svg";
import { push } from "connected-react-router";
import styled from "styled-components";
import { ClosableDrawer, HeaderMenus } from "./index";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
    zIndex: 10,
  },
  menuBar: {
    backgroundColor: "#fff",
  },
  menuButton: {
    marginRight: theme.spacing(1),
  },
  toolBar: {
    margin: "0 auto",
    maxWidth: "1024",
    width: "100%",
  },
  button: {
    margin: "0 0 0 auto",
  },
}));

export const Header = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const selector = useSelector((state) => state);
  const isSignedIn = getIsSignedIn(selector);

  const [open, setOpen] = useState(false);

  //Tab,Shiftを押した場合のみ、メニューを閉じないようにする処理
  const handleDrawerToggle = useCallback(
    (event) => {
      if (
        event.type === "keydown" &&
        (event.key === "Tab" || event.key === "Shift")
      ) {
        return;
      }
      setOpen(!open);
    },
    [setOpen, open]
  );

  return (
    <div className={classes.root}>
      <AppBar className={classes.menuBar} position="fixed">
        <Toolbar className={classes.Toolbar}>
          <StyledheaderLogo onClick={() => dispatch(push("/"))}>
            <img src={headerlogo} alt="mainlogo" />
            <h1>Racmap</h1>
          </StyledheaderLogo>
          {isSignedIn && (
            <div className={classes.button}>
              <HeaderMenus handleDrawerToggle={handleDrawerToggle} />
            </div>
          )}
        </Toolbar>
      </AppBar>
      {isSignedIn && (
        <ClosableDrawer open={open} onClose={handleDrawerToggle} />
      )}
    </div>
  );
};

const StyledheaderLogo = styled.button`
  background: none;
  outline: none;
  border: none;
  cursor: pointer;
  img {
    width: 30px;
    height: 30px;
  }
  h1 {
    margin: 0;
    font-size: 15px;
  }
`;
