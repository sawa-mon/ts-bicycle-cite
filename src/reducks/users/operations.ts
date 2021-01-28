import { providerGoogle } from "../../firebase/index";
import { signInAction, signOutAction } from "./actions";
import { push } from "connected-react-router";
import { auth, db, FirebaseTimestamp } from "../../firebase/index";
import { Dispatch } from "redux";

export const listenAuthState = () => {
  return async (dispatch: Dispatch) => {
    return auth.onAuthStateChanged((user) => {
      if (user) {
        const uid = user.uid;

        db.collection("users")
          .doc(uid)
          .get()
          .then((snapshot) => {
            const data = snapshot.data();
            if (data === undefined) {
              return null;
            }
            dispatch(
              signInAction({
                isSignedIn: true,
                icon: data.icon,
                email: data.email,
                username: data.username,
              })
            );
          });
      } else {
        dispatch(push("/signin"));
      }
    });
  };
};

export const googleSignIn = () => {
  return async (dispatch: Dispatch) => {
    auth.signInWithPopup(providerGoogle).then((result) => {
      const user = result.user;

      if (user === null) {
        return null;
      }
      const uid = user.uid;
      const timestamp = FirebaseTimestamp.now();

      const userData = {
        created_at: timestamp,
        email: user.email,
        icon: user.photoURL,
        username: user.displayName,
      };

      db.collection("users")
        .doc(uid)
        .set(userData)
        .then(() => {
          dispatch(push("/"));
        })
        .catch(() => {
          alert("ログインに失敗しました");
        });
    });
  };
};

export const signOut = () => {
  return async (dispatch: Dispatch) => {
    auth
      .signOut()
      .then(() => {
        dispatch(signOutAction());
        dispatch(push("/signin"));
      })
      .catch(() => {
        alert("ログアウトに失敗しました");
      });
  };
};
