import { AreapointsDataType } from "./../areapoints/types";
import { RouterState } from "connected-react-router";

export type StoreState = {
  areapoints: {
    list: AreapointsDataType[];
  };
  users: {
    isSignedIn: boolean;
    comment: string;
    email: string;
    icon: string;
  };
  router: RouterState;
};

declare module "react-redux" {
  interface DefaultRootState extends StoreState {}
}
