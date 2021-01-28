import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, EditButton, ImageSwiper } from "../components/UIkit";
import { fetchAreaPoints } from "../reducks/areapoints/operation";
import { getAreaPoints } from "../reducks/areapoints/selector";
import styled from "styled-components";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  sliderBox: {
    [theme.breakpoints.down("sm")]: {
      margin: "0 auto",
      height: 200,
      width: 300,
      outLine: "none",
    },
    [theme.breakpoints.up("sm")]: {
      margin: "0 auto",
      height: 200,
      width: 300,
      outLine: "none",
    },
  },
}));

export const EditAreaPointList = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const areapoints = getAreaPoints(selector);
  const [passCheck, setPassCheck] = useState(false);
  const [inputpass, setInputPass] = useState("");

  const query = selector.router.location.search;
  const prefecture = /^\?prefecture=/.test(query)
    ? query.split("?prefecture=")[1]
    : "";
  const category = /^\?category=/.test(query)
    ? query.split("?category=")[1]
    : "";

  useEffect(() => {
    dispatch(fetchAreaPoints(category, prefecture));
  }, []);

  const inputPass = useCallback(
    (event) => {
      setInputPass(event.target.value);
    },
    [setInputPass]
  );

  const checkPassWord = () => {
    const setPasskey = process.env.REACT_APP_EDIT_PAGE_KEY;
    if (setPasskey === inputpass) {
      setPassCheck(true);
    } else {
      alert("入力したパスワードが間違っています");
    }
  };

  return (
    <div>
      {passCheck ? (
        <StyledContainer>
          <h2>編集一覧ページ</h2>
          <StyledSection>
            {areapoints.length > 0 &&
              areapoints.map((areapoint, index) => (
                <StyledInfo key={index}>
                  <EditButton id={areapoint.id} />
                  <StyledTitle>
                    <strong>ラック設置エリア</strong>
                    <br />
                    {areapoint.installation}
                  </StyledTitle>
                  <MapWrap>
                    <div className={classes.sliderBox}>
                      <ImageSwiper images={areapoint.images} />
                    </div>
                  </MapWrap>
                </StyledInfo>
              ))}
          </StyledSection>
        </StyledContainer>
      ) : (
        <StyledPassContainer>
          <h2>管理用画面</h2>
          <StyledPasswordWrap>
            <p>所定のPasswordを入力してください</p>
            <input type="password" value={inputpass} onChange={inputPass} />
            <StyledButton>
              <Button
                plane
                label="照合する"
                type="button"
                onClick={() => checkPassWord()}
              />
            </StyledButton>
          </StyledPasswordWrap>
        </StyledPassContainer>
      )}
    </div>
  );
};

const StyledContainer = styled.section`
  display: grid;
  place-items: center;
  margin: 0 auto 0 auto;
`;

const StyledSection = styled.div`
  display: grid;
  place-items: center;
  @media screen and (min-width: 700px) {
    grid-template-columns: 1fr 1fr;
  }
  @media screen and (min-width: 1040px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
`;

const StyledTitle = styled.div`
  margin: 0 0 20px 15px;
`;

const StyledInfo = styled.div`
  border: 2px;
  border-radius: 5px;
  width: 320px;
  border-style: groove;
  margin: 10px;
  h3 {
    padding: 5px;
  }
`;

const StyledPassContainer = styled.div`
  display: grid;
  margin-top: calc(200px - 3%);
  h2 {
    margin: 0 auto;
  }
`;

const MapWrap = styled.div`
  display: grid;
  place-items: center;
  margin: 10px;
`;

const StyledPasswordWrap = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  input {
    width: 230px;
    height: 40px;
    font-size: 20px;
  }
`;

const StyledButton = styled.div`
  margin: 20px;
`;
