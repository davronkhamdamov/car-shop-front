import React, { useEffect, useState } from "react";
import "./Model_details.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper";
import { useParams } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";

const Model_details = () => {
  const [car, setCar] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    fetch(process.env.REACT_APP_BASE_URL + "/car/one/" + id, {
      headers: {
        authorization: localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setCar(data[0]);
      });
  }, []);
  return (
    <div>
      <br />
      <h1 className="model_title">Modellari</h1>
      <div className="car_wrapper">
        <div className="car_details">
          <h2
            style={{
              letterSpacing: "2px",
              fontSize: "30px",
              lineHeight: "60px",
            }}
          >
            {car.title}
          </h2>
          <p>{car.price} dan</p>
          <div className="car_image_small">
            <img src={car.baseimgurl} alt="car" />
          </div>
          <p>
            Marka: <span>{car.title}</span>
          </p>
          <p>
            Tanirovkasi:{" "}
            <span>{car.tanirovkasi === "true" ? "Ha" : "Yoq"}</span>
          </p>
          <p>
            Motor: <span>{car.motor}</span>
          </p>
          <p>
            Year: <span>{car.year}</span>
          </p>
          <p>
            Color: <span>{car.color}</span>
          </p>
          <p>
            Distance: <span>{car.distance}</span>
          </p>
          <p>
            Gearbook: <span>{car.gearbook}</span>
          </p>
          <p>
            Deseription: <span>{car.deseription}</span>
          </p>
          <div style={{ borderTop: "1px solid black", paddingTop: "10px" }}>
            <p style={{ textAlign: "end" }}>
              Umumiy xarajat: <span>329 900 000 so'm dan</span>
            </p>
          </div>
        </div>
        <div className="car_image">
          <Swiper
            pagination={{
              dynamicBullets: true,
            }}
            modules={[Pagination]}
            className="mySwiper"
          >
            <SwiperSlide>
              <img src={car.baseimgurl} alt="" />
            </SwiperSlide>
            <SwiperSlide>
              <img src={car.outsideimgurl} alt="" />
            </SwiperSlide>
            <SwiperSlide>
              <img src={car.insideimgurl} alt="" />
            </SwiperSlide>
          </Swiper>
          <br />
          <p style={{ textAlign: "center", letterSpacing: "1px" }}>
            Tasvir tanlangan konfiguratsiyaga mos kelmasligi mumkin. Mashinaning
            rangi ushbu saytda taqdim etilganidan farq qilishi mumkin.
          </p>
          <div className="switch_mode">
            <button>
              <AiOutlineShoppingCart />
              Add to card
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Model_details;
