import { DefaultRootState } from "react-redux";
import { createSelector } from "reselect";

const usersSelector = (state: DefaultRootState) => state.users;

export const getIsSignedIn = createSelector(
  [usersSelector],
  (state) => state.isSignedIn
);
export const getUserEmail = createSelector(
  [usersSelector],
  (state) => state.email
);
export const getUserIcon = createSelector(
  [usersSelector],
  (state) => state.icon
);
export const getUserName = createSelector(
  [usersSelector],
  (state) => state.username
);
