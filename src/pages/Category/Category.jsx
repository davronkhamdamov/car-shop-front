import React, { useEffect, useState } from "react";
import Card from "../../components/Card/Card";
import "./Category.css";

const Category = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch(process.env.REACT_APP_BASE_URL + "/model/all", {
      headers: {
        authorization: localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.statusCode === 401) {
          window.location = "/login";
        }
        setData(data);
      });
  }, []);
  return (
    <div className="category_wrapper">
      {data[0] ? (
        <Card data={data} />
      ) : (
        <div style={{ textAlign: "center", width: "100%" }}>
          <h2>Nothing found</h2>
        </div>
      )}
    </div>
  );
};

export default Category;
