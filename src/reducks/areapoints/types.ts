import { ImageType } from "../../components/UIkit/types";

export interface AreapointsDataType {
  id?: string;
  info: string;
  images?: ImageType;
  installation: string;
  locationLat: number;
  locationLng: number;
  prefecture: string;
  timestamp: number;
  category: string;
}
