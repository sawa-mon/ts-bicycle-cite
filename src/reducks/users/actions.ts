import { UserDataType } from "./types";
export const UserActionTypes = {
  SIGN_IN: "SIGN_IN",
  SIGN_OUT: "SIGN_OUT",
} as const;

export const signInAction = (userData: UserDataType) => {
  return {
    type: UserActionTypes.SIGN_IN,
    payload: {
      isSignedIn: true,
      email: userData.email,
      icon: userData.icon,
      username: userData.username,
    },
  };
};

type SignInAction = ReturnType<typeof signInAction>;

export const signOutAction = () => {
  return {
    type: UserActionTypes.SIGN_OUT,
    payload: {
      isSignedIn: false,
      email: "",
      icon: "",
      username: "",
    },
  };
};
type SignOutAction = ReturnType<typeof signOutAction>;

export type UserAction = SignInAction | SignOutAction;
