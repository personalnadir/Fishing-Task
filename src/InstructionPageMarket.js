import React from 'react';
import market from './images/market.png';

export default function InstructionPageMarket(props) {
  return (
    <div className = "InstructionPage">
      {props.children}
      <img
          alt="Market"
          src={market}
          className="CatchImage"
        />
    </div>
  );
}
