import { createSelector } from "reselect";
import { DefaultRootState } from "react-redux";

const areapointsSelector = (state: DefaultRootState) => state.areapoints;

export const getAreaPoints = createSelector(
  [areapointsSelector],
  (state) => state.list
);
