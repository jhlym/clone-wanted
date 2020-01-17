import React from "react";
import styled from "styled-components";
import { Button } from "semantic-ui-react";

const Title = styled.p`
  color: #2886fa !important;
  font-weight: 600;
  display: inline-block;
`;

const BasicButton = props => {
  const { onClick, icon, subtitle, title } = props;
  return (
    <Button basic onClick={onClick}>
      {icon && icon()}
      {subtitle && `${subtitle} `}
      <Title>{title}</Title>
    </Button>
  );
};

BasicButton.defaultProps = {
  onClick: () => {},
  icon: null,
  subtitle: null
};
export default BasicButton;
