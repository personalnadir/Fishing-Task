import React from 'react';
import boat from './images/boat.png';

export default function InstructionPageBoat(props) {
  return (
    <div className = "InstructionPage">
      {props.children}
      <img
          alt="Market"
          src={boat}
          className="CatchImage"
        />
    </div>
  );
}
