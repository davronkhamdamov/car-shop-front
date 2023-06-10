import React, { useEffect, useState } from "react";
import Card from "../../components/Card/Card";
import "./CategoryCar.css";
import { useParams } from "react-router-dom";

const CategoryCar = () => {
  const [data, setData] = useState([1]);
  const { id } = useParams();
  useEffect(() => {
    fetch(process.env.REACT_APP_BASE_URL + "/model/owncars/" + id, {
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
  }, [id]);
  return (
    <div className="category_wrapper">
      {data[0] ? (
        <Card data={data} type="car" />
      ) : (
        <div style={{ textAlign: "center", width: "100%" }}>
          <h2>Nothing found</h2>
        </div>
      )}
    </div>
  );
};

export default CategoryCar;
