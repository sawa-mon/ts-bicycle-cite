import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserName } from "../reducks/users/selectors";
import { signOut } from "../reducks/users/operations";

type Props = {
  children: React.ReactNode;
};
type Reload = (children: Props) => any;

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const Reload: Reload = ({ children }) => {
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
