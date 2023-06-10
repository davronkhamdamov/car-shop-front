import React, { useEffect, useState } from "react";
import Card from "../../components/Card/Card";
import "./Category.css";
import { useSelector } from "react-redux";

const Category = () => {
  const items = useSelector((data) => data.model.models);
  return (
    <div className="category_wrapper">
      {items[0] ? (
        <Card data={items} type="model" />
      ) : (
        <div style={{ textAlign: "center", width: "100%" }}>
          <h2>Nothing found</h2>
        </div>
      )}
    </div>
  );
};

export default Category;
