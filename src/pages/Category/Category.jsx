import React, { useEffect, useState } from "react";
import "./Category.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const Category = () => {
  const [data, setData] = useState();

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/photos")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  return (
    <div className="category_wrapper">
      {data?.map((e) => {
        return (
          <div key={e.id} className="category_item">
            <div className="imgWrapper">
              <LazyLoadImage effect="blur" src={e.url} />
            </div>
            <p className="category_title">{e.title}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Category;
