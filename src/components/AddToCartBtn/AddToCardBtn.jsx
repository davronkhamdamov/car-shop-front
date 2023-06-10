import React, { useState } from "react";
import "./AddToCard.css";

const AddToCard = ({ onClick }) => {
  const [add, setAdd] = useState(false);
  const toggleClass = "AddToCard" + " " + `${add ? "added" : ""}`;
  return (
    <div>
      <button
        className={toggleClass}
        onClick={() => {
          onClick();
          setAdd(!add);
        }}
      >
        <div className="default">Add to cart</div>
        <div className="success">Added</div>
        <div className="cart">
          <div>
            <div></div>
            <div></div>
          </div>
        </div>
        <div className="dots"></div>
      </button>
    </div>
  );
};

export default AddToCard;
