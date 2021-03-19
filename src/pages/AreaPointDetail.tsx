import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import { useDispatch, useSelector } from "react-redux";
import { db, FirebaseTimestamp } from "../firebase/index";
import { GoogleMapsComponent, ImageSwiper } from "../components/UIkit";
import styled from "styled-components";
import noImageAvatar from "../assets/Images/noImageAvatar.svg";
import submitIcon from "../assets/Images/submitIcon.svg";
import { getUserIcon, getUserName } from "../reducks/users/selectors";
import { getAreaPoints } from "../reducks/areapoints/selector";
import { Theme } from "@material-ui/core";

const useStyles = makeStyles((theme:Theme) => ({
  sliderBox: {
    [theme.breakpoints.down("sm")]: {
      margin: "5px auto 10px auto",
      height: 200,
      width: 320,
      outLine: "none",
    },
    [theme.breakpoints.up("sm")]: {
      margin: "15px auto 0 auto",
      height: 250,
      width: 400,
      outLine: "none",
    },
  },
  detail: {
    textAlign: "left",
    [theme.breakpoints.down("sm")]: {
      margin: "5px auto 10px auto",
      height: 200,
      width: 320,
    },
    [theme.breakpoints.up("sm")]: {
      margin: "15px auto 0 auto",
      height: 250,
      width: 400,
    },
  },
}));

export const AreaPointDetail = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const selector = useSelector((state) => state);

  const path = selector.router.location.pathname;
  const userName = getUserName(selector);
  const userIcon = getUserIcon(selector);
  const id = path.split("/areapoint/")[1];

  const mapContainerStyle = {
    height: "320px",
    width: "320px",
  };

  const [areapoint, setAreapoint] = useState(null);
  const [inputComment, setInputComment] = useState("");
  const [addComments, setAddComments] = useState("");
  const [areaName, setAreaName] = useState("");

  const areapointRef = db.collection("areapoints").doc(id);
  const commentRef = areapointRef.collection("comments");
  const timestamp = FirebaseTimestamp.now();

  const addInputComment = () => {
    if (!inputComment) {
      return;
    }
    commentRef.add({
      added_at: timestamp,
      comment: inputComment,
      name: userName,
      icon: userIcon,
    });
    setInputComment("");
  };

  useEffect(() => {
    db.collection("areapoints")
      .doc(id)
      .get()
      .then((doc) => {
        const data = doc.data();
        setAreapoint(data);
        switch (true) {
          case data.prefecture == "gifu":
            setAreaName("岐阜県");
            break;
          case data.prefecture == "aichi":
            setAreaName("愛知県");
            break;
          case data.prefecture == "nagano":
            setAreaName("長野県");
            break;
          case data.prefecture == "shiga":
            setAreaName("滋賀県");
            break;
          case data.prefecture == "mie":
            setAreaName("三重県");
            break;
        }
      });
  }, []);

  useEffect(() => {
    const unSub = commentRef
      .orderBy("added_at", "desc")
      .onSnapshot((snapshot) =>
        setAddComments(
          snapshot.docs.map((doc) => ({
            key: doc,
            added_at: {
              year: doc.data().added_at.toDate().getFullYear(),
              month: doc.data().added_at.toDate().getMonth() + 1,
              day: doc.data().added_at.toDate().getDate(),
              hour: doc.data().added_at.toDate().getHours(),
              minit: doc.data().added_at.toDate().getMinutes(),
              second: doc.data().added_at.toDate().getSeconds(),
            },
            comment: doc.data().comment,
            name: doc.data().name,
            icon: doc.data().icon,
          }))
        )
      );
    return () => {
      unSub();
    };
  }, []);

  return (
    <StyledSection>
      {areapoint && (
        <div>
          <StyledGrid>
            <div className={classes.sliderBox}>
              <ImageSwiper images={areapoint.images} />
            </div>
            <div className={classes.detail}>
              <StyledTitle>
                <h2>
                  〜ラックポイントエリア〜
                  <br />ー{areaName}ー
                </h2>
                <p>{areapoint.installation}</p>
                <h2>〜ラックの詳細位置〜</h2>
                <p>{areapoint.info}</p>
              </StyledTitle>
            </div>
          </StyledGrid>
          <StyledMapAndComent>
            <CommentWraper>
              <StyledTitle>
                <h2>〜エリアに関するコメント〜</h2>
                <p>ご自由にコメント入力して投稿頂けます</p>
              </StyledTitle>
              <StyledUserIconAreaWrap>
                <StyledIcon src={userIcon} />
                <textarea
                  placeholder="投稿例：このポイント付近のパン屋さん美味しいよ！など、他の方にもお知らせするのにぜひ使ってみて下さい"
                  value={inputComment}
                  onChange={(event) => setInputComment(event.target.value)}
                  cols={35}
                  rows={3}
                />
                <StyledSubmitButton
                  type="button"
                  onClick={() => dispatch(addInputComment)}
                >
                  <img src={submitIcon} alt="button-icon" />
                </StyledSubmitButton>
              </StyledUserIconAreaWrap>
              {addComments.length >= 1 && (
                <StyledCommentWrapper>
                  {addComments.map((addcomment, index) => (
                    <div key={index}>
                      <StyledCommentUserInfoArea>
                        <StyledIcon src={addcomment.icon} />
                        <StyledPostInfoWrap>
                          <p>投稿者：@{addcomment.name}</p>
                          <span>
                            投稿日時：
                            {addcomment.added_at.year}年
                            {addcomment.added_at.month}月
                            {addcomment.added_at.day}日
                            {addcomment.added_at.hour}時
                            {addcomment.added_at.minit}分
                            {addcomment.added_at.second}秒
                          </span>
                        </StyledPostInfoWrap>
                      </StyledCommentUserInfoArea>
                      <p>{addcomment.comment}</p>
                    </div>
                  ))}
                </StyledCommentWrapper>
              )}
            </CommentWraper>
            <MapAreaWrap>
              <StyledGoogleMap>
                <h2>〜GoogleMap〜</h2>
                <StyledText>ラック設置ポイントの投稿者</StyledText>
                <StyledUserIconAreaWrap>
                  <StyledIcon
                    src={areapoint.icon ? areapoint.icon : noImageAvatar}
                  />
                  <StyledText>
                    {areapoint.username ? areapoint.username : "UnknownUser"}
                  </StyledText>
                </StyledUserIconAreaWrap>
              </StyledGoogleMap>
              <GoogleMapsComponent
                zoom={16}
                info={areapoint.info}
                lat={areapoint.locationLat}
                lng={areapoint.locationLng}
                mapContainerStyle={mapContainerStyle}
              />
            </MapAreaWrap>
          </StyledMapAndComent>
        </div>
      )}
    </StyledSection>
  );
};

const StyledSection = styled.div`
  margin: 10px auto 40px auto;
  min-width: 300px;
`;

const StyledGrid = styled.div`
  display: flex;
  flex-flow: row wrap;
  height: auto;
  max-width: 1024px;
  margin: 0 auto;
`;

const StyledTitle = styled.div`
  display: flex;
  flex-direction: column;
  h2 {
    font-weight: normal;
    font-style: oblique;
    font-size: 23px;
    margin: 5px 10px 5px 10px;
  }
  p {
    font-weight: normal;
    font-style: oblique;
    margin: 5px 10px 25px 10px;
  }
`;

const MapAreaWrap = styled.div`
  display: grid;
  place-items: center;
  margin: 30px auto 0 auto;
  width: 400px;
  @media screen and (max-width: 600px) {
    width: 320px;
  }
`;

const StyledGoogleMap = styled.div`
  margin: 0 auto 0 auto;

  h2 {
    font-size: 27px;
    font-weight: normal;
    font-style: oblique;
  }
  @media screen and (max-width: 800px) {
    margin: -30px auto 0 10px;
  }
  @media screen and (max-width: 600px) {
    width: 300px;
    margin-top: -60px;
  }
`;

const StyledIcon = styled.img`
  margin: 10px;
  width: 50px;
  height: 50px;
  border-radius: 25px;
  border-style: groove;
  border-color: #deff00f7;
  background: linear-gradient(46deg, #e06218 0%, #354fdc 100%);
`;

const StyledUserIconAreaWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  textarea {
    border-radius: 10px;
    background: none;
    outline: none;
    border: ridge;
    color: white;
    font-size: 17px;
  }
`;

const StyledText = styled.p`
  display: grid;
  place-items: center;
  margin: 0;
  font-weight: normal;
  font-style: oblique;
`;

const StyledMapAndComent = styled.div`
  display: flex;
  justify-content: center;
  margin: 0 auto;
  max-width: 1024px;
  @media screen and (max-width: 800px) {
    margin-top: -40px;
    flex-direction: column;
  }
`;

const StyledSubmitButton = styled.button`
  width: 45px;
  height: 45px;
  border-radius: 22.5px;
  background: orange;
  border: none;
  outline: none;
  margin: 20px;
  img {
    width: 35px;
    height: 35px;
  }
  @media screen and (max-width: 600px) {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 35px;
    height: 35px;
    border-radius: 17.5px;
    margin: 10px;
    img {
      width: 25px;
      height: 25px;
    }
  }

  :hover {
    opacity: 0.7;
  }
`;

const CommentWraper = styled.div`
  width: 400px;
  margin: 63px auto 0px auto;
  @media screen and (max-width: 800px) {
    margin: 50px auto 100px auto;
  }
  @media screen and (max-width: 600px) {
    width: 320px;
  }
`;

const StyledCommentWrapper = styled.div`
  height: 300px;
  overflow: auto;
  border: 1px solid;
  border-radius: 5px;
  p {
    margin: 5px 10px 25px 10px;
  }
`;

const StyledCommentUserInfoArea = styled.div`
  display: flex;
`;

const StyledPostInfoWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  p {
    margin: 0;
    font-size: 18px;
  }
  span {
    font-size: 12px;
  }
`;
