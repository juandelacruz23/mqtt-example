import React, { FC } from 'react';
import { Text, Separator } from 'office-ui-fabric-react';

interface ICardProps {
  title: string,
  children: JSX.Element,
  expand?: boolean,
  className?: string,
}

const Card : FC<ICardProps> = (props : ICardProps) => {
  return (
    <div className={`card ${props.className} ${props.expand ? "expand" : ""}`}>
      <Text className="card-title" variant="large">{props.title}</Text>
      <Separator />
      <div className="card-content">
        {props.children}
      </div>
    </div>
  );
};

export default Card;