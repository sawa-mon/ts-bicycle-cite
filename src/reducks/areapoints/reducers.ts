import * as Actions from "./actions";
import initialState from "../store/initialState";

export const AreaPointsReducer = (state = initialState.areapoints, action) => {
  switch (action.type) {
    case Actions.DELETE_AREAPOINT:
      return {
        ...state,
        list: [...action.payload],
      };
    case Actions.FETCH_AREAPOINTS:
      return {
        ...state,
        list: [...action.payload],
      };
    default:
      return state;
  }
};
