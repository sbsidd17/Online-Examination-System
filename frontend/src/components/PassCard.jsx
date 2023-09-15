import React from "react";

function PassCard({ icon, name }) {
  return (
    <div className="flex items-center gap-3 w-1/2  p-3">
      <div>{icon}</div>
      <div className="flex justify-center items-center">
        {name}
      </div>
    </div>
  );
}

export default PassCard;
