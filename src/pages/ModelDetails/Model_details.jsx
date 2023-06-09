import React, { useEffect, useState } from "react";
import "./Model_details.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper";
import { useParams } from "react-router-dom";
import AddToCard from "../../components/AddToCartBtn/AddToCardBtn";
import { useDispatch, useSelector } from "react-redux";
import { CartActions } from "../../redux/reduser.Cart";

const Model_details = () => {
  const [car, setCar] = useState([]);
  const { id } = useParams();
  const items = useSelector((data) => data.cart.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    fetch(process.env.REACT_APP_BASE_URL + "/car/one/" + id, {
      headers: {
        authorization: localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status > 400) {
          window.location = "/";
        }
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
            {car?.title}
          </h2>
          <p>{car?.price}$ dan</p>
          <div className="car_image_small">
            <img src={car?.baseimgurl} alt="car" />
          </div>
          <p>
            Marka: <span>{car?.title}</span>
          </p>
          <p>
            Tanirovkasi:{" "}
            <span>{car?.tanirovkasi === "true" ? "Ha" : "Yoq"}</span>
          </p>
          <p>
            Motor: <span>{car?.motor}</span>
          </p>
          <p>
            Year: <span>{car?.year}</span>
          </p>
          <p>
            Color: <span>{car?.color}</span>
          </p>
          <p>
            Distance: <span>{car?.distance}</span>
          </p>
          <p>
            Gearbook: <span>{car?.gearbook}</span>
          </p>
          <p>
            Deseription: <span>{car?.deseription}</span>
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
              <img src={car?.baseimgurl} alt="" />
            </SwiperSlide>
            <SwiperSlide>
              <img src={car?.outsideimgurl} alt="" />
            </SwiperSlide>
            <SwiperSlide>
              <img src={car?.insideimgurl} alt="" />
            </SwiperSlide>
          </Swiper>
          <br />
          <p style={{ textAlign: "center", letterSpacing: "1px" }}>
            Tasvir tanlangan konfiguratsiyaga mos kelmasligi mumkin. Mashinaning
            rangi ushbu saytda taqdim etilganidan farq qilishi mumkin.
          </p>
          <div className="switch_mode">
            {items?.some((e) => e.car_id === car?.id) ? (
              <button
                onClick={() => {
                  fetch(
                    process.env.REACT_APP_BASE_URL +
                      "/cart/delete/" +
                      items?.filter((e) => e.car_id === car.id)[0].id,
                    {
                      method: "DELETE",
                      headers: {
                        authorization: localStorage.getItem("token"),
                      },
                    }
                  )
                    .then((res) => res.json())
                    .then((data) => {
                      if (data.error) {
                        return;
                      }
                      dispatch(CartActions.setPosts(data));
                    });
                }}
                className="cancel_btn"
              >
                Delele
              </button>
            ) : (
              <AddToCard
                onClick={() => {
                  fetch(process.env.REACT_APP_BASE_URL + "/cart/create", {
                    method: "POST",
                    body: JSON.stringify({
                      car_id: car.id,
                      count: 1,
                    }),
                    headers: {
                      "Content-type": "application/json",
                      authorization: localStorage.getItem("token"),
                    },
                  })
                    .then((res) => res.json())
                    .then((data) => {
                      if (data.error) {
                        return;
                      }
                      setTimeout(() => {
                        dispatch(CartActions.setPosts(data));
                      }, 2500);
                    });
                }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Model_details;
