import React, { FC } from "react";
import { Text, Separator } from "office-ui-fabric-react";

interface CardProps {
  title: string;
  children: JSX.Element;
  expand?: boolean;
  className?: string;
}

const Card: FC<CardProps> = props => {
  return (
    <div className={`card ${props.className} ${props.expand ? "expand" : ""}`}>
      <Text className="card-title" variant="large">
        {props.title}
      </Text>
      <Separator />
      <div className="card-content">{props.children}</div>
    </div>
  );
};

export default Card;
