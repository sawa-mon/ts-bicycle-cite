import { ImageTypes } from "../../components/UIkit/types";

export interface AreapointsDataType {
  id?: string;
  info: string;
  images?: ImageTypes;
  installation: string;
  locationLat: number;
  locationLng: number;
  prefecture: string;
  timestamp: { seconds: number; nanoseconds: number };
  category: string;
  username: string;
  icon: string;
}
