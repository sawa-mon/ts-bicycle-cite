import { ActionTypes, AreaPointActions } from "./actions";
import initialState from "../store/initialState";

export const AreaPointsReducer = (
  state = initialState.areapoints,
  action: AreaPointActions
) => {
  switch (action.type) {
    case ActionTypes.DELETE_AREAPOINT:
      return {
        ...state,
        list: [...action.payload],
      };
    case ActionTypes.FETCH_AREAPOINTS:
      return {
        ...state,
        list: [...action.payload],
      };
    default:
      return state;
  }
};
