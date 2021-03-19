import { AreapointsDataTypes } from "./types";

export const ActionTypes = {
  DELETE_AREAPOINT: "DELETE_AREAPOINT",
  FETCH_AREAPOINTS: "FETCH_AREAPOINTS",
} as const;

export const deleteAreaPointsAction = (areapoints: AreapointsDataTypes) => {
  return {
    type: ActionTypes.DELETE_AREAPOINT,
    payload: areapoints,
  };
};

type DeleteAreaPointsAction = ReturnType<typeof deleteAreaPointsAction>;

export const fetchAreaPointsAction = (areapoints: AreapointsDataTypes) => {
  return {
    type: ActionTypes.FETCH_AREAPOINTS,
    payload: areapoints,
  };
};

type FetchAreaPointsAction = ReturnType<typeof fetchAreaPointsAction>;

export type AreaPointActions = FetchAreaPointsAction | DeleteAreaPointsAction;
