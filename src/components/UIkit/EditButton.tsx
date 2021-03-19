import React, { useState } from "react";
import { push } from "connected-react-router";
import { useDispatch } from "react-redux";
import { deleteAreaPoint } from "../../reducks/areapoints/operations";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MenuIcon from "@material-ui/icons/Menu";

type Props = {
  id: string;
}

export const EditButton:React.FC<Props> = (props) => {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState<null | (EventTarget & HTMLButtonElement)>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
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