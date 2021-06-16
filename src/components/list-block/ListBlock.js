import React from "react";
import "./ListBlock.css";
import { connect } from "react-redux";

const ListBlock = ({ listBlockIndex, userLists }) => {
  return (
    <button className="listBlock">{userLists[listBlockIndex].name}</button>
  );
};

const stateToProps = (state = {}) => {
  return {
    userLists: state.userLists,
  };
};

const ListBlockConnected = connect(stateToProps, null)(ListBlock);

export default ListBlockConnected;
