import React from "react";

const DetailCard = ({ Icon, title, sub }) => {
  return (
    <div className="cflex dCard">
      {Icon}
      <div>
        <h3 className="card-org-title">{title || "12%"}</h3>
        <h5 className="card-org-sub">{sub || "1%"}</h5>
      </div>
    </div>
  );
};

export default DetailCard;
