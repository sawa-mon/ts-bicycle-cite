import { UserDataType } from "./types";
import { UserAction, UserActionTypes } from "./actions";
import initialState from "../store/initialState";

export const UsersReducer = (
  state: UserDataType = initialState.users,
  action: UserAction
) => {
  switch (action.type) {
    case UserActionTypes.SIGN_IN:
      return {
        ...state,
        ...action.payload,
      };

    case UserActionTypes.SIGN_OUT:
      return {
        ...action.payload,
      };
    default:
      return state;
  }
};
