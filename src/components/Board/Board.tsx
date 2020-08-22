import React from "react";
// import { connect } from 'react-redux';
import "./index.css";

const Board: React.FC<{ title: string }> = ({ title }: {title: string}): JSX.Element => {
  return (
    <div>
      { title }
    </div>
  );
};

// const mapStateToProps = (state: any) => state;

// const Board = connect(mapStateToProps)(BoardView);

export {
  Board
};