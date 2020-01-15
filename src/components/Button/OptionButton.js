import React from "react";
import styled, { css } from "styled-components";

const Button = styled.button`
  cursor: pointer;
  margin-right: 9px;
  margin-bottom: 9px;
  border: 1px solid #e1e2e3;
  padding: 11px 13px;
  font-size: 15px;
  line-height: 1;
  font-weight: 600;
  ${props =>
    props.selected === true
      ? css`
          color: #fff;
          background: #0092fc;
          border-color: #0092fc;
        `
      : css`
          background: #f8f8fa;
          color: #333;
        `}
`;

const OptionButton = ({ selected, children, onClick }) => {
  return (
    <Button selected={selected} onClick={onClick}>
      {children}
    </Button>
  );
};

OptionButton.defaultProps = {
  selected: false,
  onClick: () => {}
};
export default OptionButton;
