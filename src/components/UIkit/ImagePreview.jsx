import React from "react";
import closeMark from "../../assets/Images/closeMark.svg";
import styled from "styled-components";

export const ImagePreview = (props) => {
  return (
    <StyledMediaThumb>
      <StyledDeleteButton onClick={() => props.delete(props.id)}>
        <label>
          <img src={closeMark} alt="closeicon" />
        </label>
      </StyledDeleteButton>
      <StyledImage alt="プレビュー画像" src={props.path} />
    </StyledMediaThumb>
  );
};

const StyledMediaThumb = styled.div`
  position: relative;
  overflow: hidden;
  width: 100%;
  ::before {
    content: "";
    display: block;
    padding-top: 42%;
  }
`;
const StyledImage = styled.img`
  position: absolute;
  object-fit: cover;
  object-position: center;
  top: 0;
  left: 0;
  width: 100%;
  height: auto;
`;

const StyledDeleteButton = styled.button`
  z-index: 1;
  position: relative;
  top: 0;
  left: 0;
  width: 32px;
  height: 32px;
  border-radius: 16px;
  border: none;
  opacity: 0.7;
  outline: none;
  :hover {
    opacity: 0.2;
  }
  img {
    cursor: pointer;
  }
`;
