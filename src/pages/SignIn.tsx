import React, { useState } from "react";
import { googleSignIn } from "../reducks/users/operations";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import GoogleIcon from "../assets/Images/google.svg";
import { Loading } from "../components/UIkit/Loading";

const SignIn = () => {
  const dispatch = useDispatch();
  const [nonDisplay, setNonDisplay] = useState(false);

  const selectLogin = (id: string) => {
    switch (id) {
      case "google":
        dispatch(googleSignIn());
        setNonDisplay(true);
        break;
      default:
        break;
    }
  };

  const loginMenus = [
    {
      func: selectLogin,
      label: "Googleアカウントでログイン",
      icon: GoogleIcon,
      id: "google",
      style: {
        backgroundColor: "f5f5f5",
        color: "black",
        fontSize: "15px",
        width: "245px",
        display: "flex",
        placeItems: "center",
        padding: "5px",
        margin: "25px auto 25px auto",
        borderRadius: "5px",
      },
    },
  ];

  return (
    <Section>
      {nonDisplay ? (
        <Loading />
      ) : (
        <>
          <StyledMainTitle>今日、自転車でどこ行こう？</StyledMainTitle>
          <Styledcoment>
            バイクラックがあるとこで休憩したい。
            そういう情報を確認するツールって？
          </Styledcoment>
          <Styledcoment>
            そんな時に使ってみてください。すると、新しい発見があるかも。
            グルメを楽しむ。景色を楽しむ。etc...
          </Styledcoment>
          <Styledcoment>
            新たな発見を情報ページの投稿機能を使って
            コメントとして残すこともできます。
          </Styledcoment>
          <Styledcoment>
            知らなかった場所や気になるポイントへぜひ実際に足を運んでみて下さい。
          </Styledcoment>
          <StyledInfo>いずれかのSNSアカウントでログインして下さい</StyledInfo>
          {loginMenus.map((menu) => (
            <StyledButton
              key={menu.id}
              style={menu.style}
              onClick={() => menu.func(menu.id)}
            >
              <StyledLoginIcon src={menu.icon} alt="LoginIcon" />
              {menu.label}
            </StyledButton>
          ))}
        </>
      )}
    </Section>
  );
};

export default SignIn;

const Section = styled.div`
  min-width: 300px;
  background: linear-gradient(46deg, #e06218 0%, #354fdc 100%);
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto 0 auto;
`;

const StyledMainTitle = styled.h2`
  margin: 0 auto 0 auto;
  padding-top: 5px;
  font-size: 23px;
  display: grid;
  place-items: center;
  text-align: center;
  @media screen and (min-width: 640px) {
    padding-top: 0;
  }
`;

const Styledcoment = styled.h4`
  width: 315px;
  margin: 0 auto;
  padding: 12px;
  display: grid;
  place-items: center;
  text-align: center;
  font-size: 16px;
  @media screen and (min-width: 640px) {
    width: 640px;
  }
`;

const StyledInfo = styled.h3`
  width: 200px;
  margin: 15px auto 15px auto;
  text-align: center;
  font-size: 15px;
`;

const StyledButton = styled.button`
  outline: none;
  cursor: pointer;
  :hover {
    opacity: 0.7;
  }
`;

const StyledLoginIcon = styled.img`
  height: 26px;
  width: 26px;
  margin-right: 5px;
`;
