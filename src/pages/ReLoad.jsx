import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserName } from "../reducks/users/selectors";
import { signOut } from "../reducks/users/operations";

export const Reload = ({ children }) => {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const name = getUserName(selector);

  useEffect(() => {
    if (name.length === 0) {
      dispatch(signOut());
    }
  }, []);

  if (!name) {
    return <></>;
  } else {
    return children;
  }
};
