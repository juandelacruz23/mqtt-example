import React, { FC } from 'react';
import { Text, Separator } from 'office-ui-fabric-react';

interface ICardProps {
  title: string,
  children: JSX.Element,
}

const Card : FC<ICardProps> = (props : ICardProps) => {
  return (
    <div className="card">
      <Text className="card-title" variant="large">{props.title}</Text>
      <Separator />
      <div className="card-content">
        {props.children}
      </div>
    </div>
  );
};

export default Card;