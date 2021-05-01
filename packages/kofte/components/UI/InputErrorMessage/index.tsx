import React from "react";

export const InputErrorMessage: React.FC = (props) => {
  return (
    <div style={{ color: "firebrick", fontWeight: "bold" }}>
      {props.children}
    </div>
  );
};
