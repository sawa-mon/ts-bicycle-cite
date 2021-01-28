import { userDataType } from "./types";
export const userActionTypes = {
  SIGN_IN: "SIGN_IN",
  SIGN_OUT: "SIGN_OUT",
} as const;

export const signInAction = (userdata: userDataType) => {
  return {
    type: "SIGN_IN",
    payload: {
      isSignedIn: true,
      email: userdata.email,
      icon: userdata.icon,
      username: userdata.username,
    },
  };
};

type SignInAction = ReturnType<typeof signInAction>;

export const signOutAction = () => {
  return {
    type: "SIGN_OUT",
    payload: {
      isSignedIn: false,
      email: "",
      icon: "",
      username: "",
    },
  };
};

export type UserAction = SignInAction;
