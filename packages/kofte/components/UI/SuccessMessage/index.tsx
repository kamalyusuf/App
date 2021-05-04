import React from "react";

export const SuccessMessage: React.FC = (props) => {
  return (
    <div style={{ color: "green", fontWeight: "bold" }}>{props.children}</div>
  );
};
