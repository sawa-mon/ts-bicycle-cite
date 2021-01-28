export const SIGN_IN = "SIGN_IN";
export const signInAction = (userdata) => {
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

export const SIGN_OUT = "SIGN_OUT";
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
