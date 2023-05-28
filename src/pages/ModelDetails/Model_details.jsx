import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import "./Model_details.css";
const Model_details = () => {
  const param = useParams();
  useEffect(() => {
    fetch("url", {})
      .then((res) => res.json())
      .then((data) => {
        // todo
      });
  }, []);
  return (
    <div>
      <br />
      <h1 className="model_title">Modellari</h1>
      <div className="car_wrapper">
        <div className="car_details">
          <h2 style={{ letterSpacing: "2px", lineHeight: "10px" }}>
            Chevrolet Malibu
          </h2>
          <p>329 900 000 so‘m dan</p>
          <div className="car_image_small">
            <img src="https://picsum.photos/360/200" alt="" />
          </div>
          <p>
            Marka: <span>CHEVROLET</span>
          </p>
          <p>
            Tanirovkasi: <span>Yo‘q</span>
          </p>
          <p>
            Motor: <span>1.6</span>
          </p>
          <p>
            Year: <span>2016</span>
          </p>
          <p>
            Color: <span>Oq</span>
          </p>
          <p>
            Distance: <span>3000 km</span>
          </p>
          <p>
            Gearbook: <span>Avtomat karobka</span>
          </p>
          <p>
            Deseription:
            <span>
              Mishina ideal holatda krasska top toza 100tali. Ayol kishiniki
              judayam akuratno haydalgan.
            </span>
          </p>
          <hr />
          <div>
            <p style={{ textAlign: "end" }}>
              Umumiy xarajat: <span>329 900 000 so'm dan</span>
            </p>
          </div>
        </div>
        <div className="car_image">
          <iframe
            style={{ border: "1px solid red" }}
            width="900"
            height="450"
            src="https://momento360.com/e/u/975adf21f7c840c3bd84b373ea393673?utm_campaign=embed&utm_source=other&heading=0&pitch=0&field-of-view=75&size=medium&display-plan=true"
            frameborder="0"
          ></iframe>
          <p style={{ textAlign: "center", letterSpacing: "1px" }}>
            Tasvir tanlangan konfiguratsiyaga mos kelmasligi mumkin. Mashinaning
            rangi ushbu saytda taqdim etilganidan farq qilishi mumkin.
          </p>
          <div className="switch_mode">
            <input type="radio" name="mode" id="inside" />
            <label htmlFor="inside">Inside</label>
            <input type="radio" name="mode" id="outside" />
            <label htmlFor="outside">Outside</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Model_details;
