import React, { useCallback, useEffect, useState } from "react";
import { Button, SelectBox } from "../components/UIkit";
import styled from "styled-components";
import { saveAddPoint } from "../reducks/areapoints/operations";
import { AddImage } from "../components/UIkit";
import { db } from "../firebase";
import { ImageTypes } from "../components/UIkit/types";
import { useDispatch } from "react-redux";
import { listType } from "./types";
import { AreapointsDataType } from "../reducks/areapoints/types";

export const InstallationInfoEdit: React.FC<AreapointsDataType> = () => {
  let id = window.location.pathname.split("/installationinfoedit")[1];
  const dispatch = useDispatch();
  if (id !== "") {
    id = id.split("/")[1];
  }

  const [info, setInfo] = useState("");
  const [installation, setInstallation] = useState("");
  const [images, setImages] = useState<ImageTypes>([]);
  const [locationLat, setLocationLat] = useState("");
  const [locationLng, setLocationLng] = useState("");
  const [prefecture, setPrefecture] = useState("");
  const [prefectures, setPrefectures] = useState<listType[]>([]);
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState<listType[]>([]);

  const inputInfo = useCallback(
    (event) => {
      setInfo(event.target.value);
    },
    [setInfo]
  );

  const inputInsatallation = useCallback(
    (event) => {
      setInstallation(event.target.value);
    },
    [setInstallation]
  );

  // /編集ページにおけるデータベースからのデータ取得
  useEffect(() => {
    const locationData = async (): Promise<void> => {
      if (id !== "") {
        await db
          .collection("areapoints")
          .doc(id)
          .get()
          .then((snapshot) => {
            const data = snapshot.data();
            if (data === undefined) {
              return null;
            }
            setInfo(data.info);
            setInstallation(data.installation);
            setImages(data.images);
            setLocationLat(data.locationLat);
            setLocationLng(data.locationLng);
            setPrefecture(data.prefecture);
            setCategory(data.category);
          });
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      locationData();
    };
  }, [id]);

  useEffect(() => {
    db.collection("prefectures")
      .orderBy("id", "asc")
      .get()
      .then((snapshots) => {
        const list: listType[] = [];
        snapshots.forEach((snapshot) => {
          const data = snapshot.data();
          list.push({
            id: data.id,
            name: data.name,
          });
        });
        setPrefectures(list);
      });
  }, []);

  useEffect(() => {
    db.collection("categories")
      .orderBy("number", "asc")
      .get()
      .then((snapshots) => {
        const categorylist: listType[] = [];
        snapshots.forEach((snapshot) => {
          const categorydata = snapshot.data();
          categorylist.push({
            id: categorydata.id,
            name: categorydata.name,
          });
        });
        setCategories(categorylist);
      });
  }, []);

  const mapContainerStyle = {
    height: "320px",
    width: "320px",
  };

  return (
    <StyledSection>
      <h2>ラックポイント登録</h2>
      <StyledDiv>
        <AddImage images={images} setImages={setImages} />
        <h3>ラック設置エリア名</h3>
        <StyledInput
          onChange={inputInsatallation}
          type="text"
          placeholder="バイクラックの場所概要：道の駅〇〇"
          value={installation}
        />
        <h3>ラック設置場所</h3>
        <StyledInput
          onChange={inputInfo}
          type="text"
          placeholder="地図内表示される位置コメント：位置は〇〇です"
          value={info}
        />
        <Wrap>
          <h3>追加するMapのポイントデータ</h3>
          <p>
            経度:{(Number(locationLat) * 1000000) / 1000000}
            <br />
            緯度:{(Number(locationLng) * 1000000) / 1000000}
          </p>
          <h4>Mapで指定したい位置を選択して下さい</h4>
        </Wrap>
        {/* <Wrap>
          <GoogleMapsComponent
            zoom={Number(10)}
            lat={!locationLat ? 35.338657 : locationLat}
            lng={!locationLat ? 137.115682 : locationLng}
            mapContainerStyle={mapContainerStyle}
            locationLat={setLocationLat}
            locationLng={setLocationLng}
          />
        </Wrap> */}
        <h3>カテゴリ選択</h3>
        <Wrap>
          <SelectBox
            options={prefectures}
            select={setPrefecture}
            value={prefecture}
          />
        </Wrap>
        <Wrap>
          <SelectBox
            options={categories}
            select={setCategory}
            value={category}
          />
        </Wrap>
        <Wrap>
          {info &&
          installation &&
          locationLat &&
          locationLng &&
          prefecture &&
          category ? (
            <Button
              plane={false}
              label="この内容で登録する"
              onClick={() =>
                dispatch(
                  saveAddPoint({
                    id,
                    info,
                    images,
                    installation,
                    locationLat,
                    locationLng,
                    prefecture,
                    category
                  })
                )
              }
            />
          ) : (
            <Button
              plane={true}
              label="未入力項目入力があります"
              onClick={() => null}
            />
          )}
        </Wrap>
      </StyledDiv>
    </StyledSection>
  );
};

const StyledInput = styled.input`
  width: 300px;
  height: 40px;
  margin-bottom: 40px;
`;

const StyledDiv = styled.div`
  display: grid;
  place-items: center;
`;

const StyledSection = styled.section`
  display: grid;
  place-items: center;
  margin: 0 auto;
  h3 h4 {
    margin: 0;
  }
`;

const Wrap = styled.div`
  margin: 20px;
`;
