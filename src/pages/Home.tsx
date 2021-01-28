import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { push } from "connected-react-router";
import HomeImage from "../assets/Images/homepage-image.png";
import { Button } from "../components/UIkit/index";

const Home:React.FC = () => {
  const dispatch = useDispatch();

  return (
    <Section>
      <StyledContainer>
        <img src={HomeImage} alt="homepageimage" />
        <h2>バイクラックのあるポイントには寄ってみたくなる</h2>
        <p>スタンドの付いていない事が多いスポーツバイク</p>
        <p>そんな自転車に乗っていて自然に利用するバイクラック</p>
        <p>バイクラックが置いてあるところはグルメも美味しい</p>
        <p>登った先の景色がいいところかもしれません</p>
        <p>行ったことのないポイントを見つけて出掛けてみよう</p>
      </StyledContainer>
      <StyledContainer>
        <h2>使い方は簡単</h2>
        <p>
          <strong>右上のメニューバー</strong>から対象地域を検索して見るだけ！
        </p>
        <p>一番新しい投稿が上部に表示されるのでチェックも簡単！</p>
        <p>その場所に行くかどうかはあなた次第！</p>
        <p>
          もし、新しいバイクラックを見つけたら
          <br />
          設置ポイント追加機能(画像UP可)を使って他の人にも
          <br />
          そのことを知らせてあげよう！
        </p>
        <p>
          実際に行ってみて近くに良いお店があった！や、感想など
          <br />
          コメント欄に書き残してその場所の情報をサイクリスト同士共有しよう！
        </p>
      </StyledContainer>
      <StyledButton>
        <Button
          label="実際に使ってみる"
          plane
          onClick={() => dispatch(push("/"))}
        />
      </StyledButton>
    </Section>
  );
};

export default Home;

const Section = styled.section`
  margin: auto;
`;

const StyledContainer = styled.div`
  display: grid;
  place-items: start;
  margin: 0 auto 0 auto;
  img {
    width: 100%;
  }
  h2 {
    display: grid;
    place-items: center;
    padding: 25px;
    margin: 0 auto;
    font-size: 30px;
    @media screen and (max-width: 600px) {
      font-size: 24px;
      min-width: 300px;
    }
  }
  p {
    text-align: center;
    padding: 10px;
    margin: 0 auto;
    font-size: 20px;
    min-width: 300px;
    @media screen and (max-width: 600px) {
      text-align: left;
    }
  }
  strong {
    color: blue;
  }
`;

const StyledButton = styled.div`
  margin: 60px auto 40px auto;
  display: grid;
  place-items: center;
  @media screen and (max-width: 600px) {
    margin-top: 40px;
  }
`;
