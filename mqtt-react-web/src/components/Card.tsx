import React, { FC } from 'react';

interface ICardProps {
  title: string,
  children: JSX.Element,
}

const Card : FC<ICardProps> = (props : ICardProps) => {
  return (
    <div className="card">
      <h3 className="card-title">{props.title}</h3>
      <div className="card-content">
        {props.children}
      </div>
    </div>
  );
};

export default Card;