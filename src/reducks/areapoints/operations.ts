import { StoreState } from "./../store/types";
import { push } from "connected-react-router";
import { Dispatch } from "redux";
import { db, FirebaseTimestamp } from "../../firebase";
import {
  deleteAreaPointsAction,
  fetchAreaPointsAction,
  AreaPointActions,
} from "./actions";
import { AreapointsDataType } from "./types";

const areapointsRef = db.collection("areapoints");

//エリア情報取得
export const fetchAreaPoints = (category: string, prefecture: string) => {
  return async (dispatch: Dispatch<AreaPointActions>) => {
    let query = areapointsRef.orderBy("timestamp", "desc");
    // orderByに加えてprefectureが空白ではなかったらwhere条件文でフィールドがprefectureのものを取得する
    query =
      prefecture !== "" ? query.where("prefecture", "==", prefecture) : query;
    query = category !== "" ? query.where("category", "==", category) : query;

    query.get().then((snapshots) => {
      const areapointList: AreapointsDataType[] = [];
      snapshots.forEach((snapshot) => {
        const areapoint = snapshot.data() as AreapointsDataType;
        areapointList.push(areapoint);
      });
      dispatch(fetchAreaPointsAction(areapointList));
    });
  };
};

//dbエリア情報の削除処理
export const deleteAreaPoint = (id: string) => {
  return async (
    dispatch: Dispatch<AreaPointActions>,
    getState: () => StoreState
  ) => {
    areapointsRef
      .doc(id)
      .delete()
      .then(() => {
        const prevAreaPoints = getState().areapoints.list;
        const nextAreaPoints = prevAreaPoints.filter(
          (areapoint) => areapoint.id !== id
        ); //配列に渡ってきた削除されたもの以外のidを回す
        dispatch(deleteAreaPointsAction(nextAreaPoints));
      });
  };
};

//ラック設置ポイントの登録処理
export const saveAddPoint = ({
  id,
  info,
  images,
  installation,
  locationLat,
  locationLng,
  prefecture,
  category,
}: AreapointsDataType) => {
  return async (dispatch: Dispatch, getState: () => StoreState) => {
    const timestamp = FirebaseTimestamp.now();
    const userInfo = getState().users;
    const userName = userInfo.username;
    const icon = userInfo.icon;

    const data = {
      id: id,
      info: info,
      images: images,
      installation: installation,
      locationLat: parseFloat(String(locationLat)),
      locationLng: parseFloat(String(locationLng)),
      prefecture: prefecture,
      timestamp: timestamp,
      category: category,
      username: userName,
      icon: icon,
    };

    //新規作成のページのときのみ(idが""=新規作成)は実行
    if (id === "") {
      const ref = areapointsRef.doc();
      id = ref.id;
      data.id = id;
      data.timestamp = timestamp;
    }

    data.username = userName;
    data.icon = icon;

    return areapointsRef
      .doc(id)
      .set(data, { merge: true }) //dataのみだとデータを上書きしてしまう為
      .then(() => {
        dispatch(push("/"));
      })
      .catch((error) => {
        throw new Error(error);
      });
  };
};
