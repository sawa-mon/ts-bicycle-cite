import React, { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import {
  getUserEmail,
  getUserIcon,
  getUserName,
} from "../reducks/users/selectors";

export const UserInfo = () => {
  const selector = useSelector((state) => state);
  const userName = getUserName(selector);
  const userIcon = getUserIcon(selector);
  const userEmail = getUserEmail(selector);

  return (
    <Section>
      <StyledTitle>ログインユーザー情報</StyledTitle>
      <StyledImage src={userIcon} alt="usericon" />
      <StyledTitle>＜ユーザー名＞</StyledTitle>
      <StyledName>@{userName}</StyledName>
      <h4>コメント時の投稿者名に使用されます。</h4>
    </Section>
  );
};

const Section = styled.div`
  display: grid;
  place-items: center;
`;
const StyledTitle = styled.h2`
  margin-top: 40px;
  font-size: 30px;
`;

const StyledName = styled.h3`
  font-size: 25px;
  margin: 0 auto;
`;

const StyledImage = styled.img`
  width: 260px;
  height: 260px;
  border-radius: 130px;
  margin: 10px auto 10px auto;
`;
