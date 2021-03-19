import React from "react";
import styled from "styled-components";

export const SelectBox = (props) => {
  return (
    <StyledSelect
      id={props.id}
      onChange={(event) => props.select(event.target.value)}
    >
      {props.options.map((option) => (
        <option key={option.id} value={option.id}>
          {option.name}
        </option>
      ))}
    </StyledSelect>
  );
};

const StyledSelect = styled.select`
  width: 300px;
  height: 40px;
  font-size: 20px;
  background-color: #d1d1d1;
  border: none;
  outline: none;
`;
