import React from "react";
import styled from "styled-components";

interface Props {
  label: string;
  plane: boolean;
  onClick: () => void;
}

export const Button: React.FC<Props> = (props) => {
  return (
    <StyledButton
      plane={props.plane}
      type={"button"}
      onClick={props.onClick && (() => props.onClick())}
    >
      {props.label}
    </StyledButton>
  );
};

const StyledButton = styled.button<{ plane: boolean }>`
  background: ${(props) => (props.plane ? "#d8d8d8a8" : "#47c9f3b5")};

  display: grid;
  place-items: center;
  width: 230px;
  height: 30px;
  border: none;
  border-radius: 15px;
  /* border-style: groove; */
  font-size: 15px;
  font-weight: bold;
  outline: none;
  cursor: pointer;
  :hover {
    opacity: 0.7;
  }
`;
