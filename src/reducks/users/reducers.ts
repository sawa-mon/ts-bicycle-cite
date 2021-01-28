import { UserAction, userActionTypes } from "./actions";
import initialState from "../store/initialState";

export const UsersReducer = (
  state = initialState.users,
  action: UserAction
) => {
  switch (action.type) {
    case userActionTypes.SIGN_IN:
      return {
        ...state,
        ...action.payload,
      };

    case userActionTypes.SIGN_OUT:
      return {
        ...action.payload,
      };
    default:
      return state;
  }
};
