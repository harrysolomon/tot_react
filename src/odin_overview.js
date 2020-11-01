import React from "react";
import uniqid from "uniqid";

const Overview = (props) => {
  const { tasks } = props;

  return (
    <ul>
      {tasks.map((task) => {
        return <li key={uniqid()}>{task}</li>;
      })}
    </ul>
  );
};

export default Overview;