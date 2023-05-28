import React from "react";
import "./Category.css";

const Category = () => {
  return (
    <div className="category_wrapper">
      {new Array(8).fill("#").map(() => {
        return (
          <div className="category_item">
            <div className="imgWrapper">
              <img src="https://picsum.photos/400/250" alt="" />
            </div>
            <p className="category_title">CHEVROLET</p>
          </div>
        );
      })}
    </div>
  );
};

export default Category;
