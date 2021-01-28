import React, { useState } from "react";
import { push } from "connected-react-router";
import menuIcon from "../../assets/Images/menuIcon.svg";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { deleteAreaPoint } from "../../reducks/areapoints/operation";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MenuIcon from "@material-ui/icons/Menu";

export const EditButton = (props) => {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton onClick={handleClick}>
        <MenuIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem
          onClick={() => {
            dispatch(push("/installationinfoedit/" + props.id));
            handleClose();
          }}
        >
          編集する
        </MenuItem>
        <MenuItem
          onClick={() => {
            dispatch(deleteAreaPoint(props.id));
            handleClose();
          }}
        >
          削除する
        </MenuItem>
      </Menu>
    </div>
  );
};

const StyledMenuIcon = styled.button`
  width: 30px;
  height: 30px;
  border-radius: 15px;
  border: none;
  outline: none;
  background: white;
  opacity: 0.7;
  cursor: pointer;
  img {
    cursor: pointer;
  }
  :hover {
    opacity: 0.5;
  }
`;
