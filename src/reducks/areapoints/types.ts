import { ImageTypes } from "../../components/UIkit/types";

export interface AreapointsDataType {
  id: string;
  info: string;
  images?: ImageTypes;
  installation: string;
  locationLat: string;
  locationLng: string;
  prefecture: string;
  category: string;
}

export type AreapointsDataTypes = Array<AreapointsDataType>