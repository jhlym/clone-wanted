import React from "react";
import { Card, Icon, Image } from "semantic-ui-react";

const PhotoCard = props => {
  const { src, title, meta, desc, content } = props;

  return (
    <Card style={{ cursor: "pointer", minHeight: "380px" }}>
      <Image src={src} wrapped ui={false} />
      <Card.Content>
        <Card.Header>{title}</Card.Header>
        <Card.Meta>
          <span className="date">{meta}</span>
        </Card.Meta>
        <Card.Description>{desc}</Card.Description>
      </Card.Content>
      <Card.Content extra>{content}</Card.Content>
    </Card>
  );
};

PhotoCard.defaultProps = {
  src: "",
  title: "",
  meta: "",
  desc: ""
};
export default PhotoCard;
