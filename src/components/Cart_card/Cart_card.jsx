import { useState } from "react";
import { Link } from "react-router-dom";
import "./Cart_card.css";
import { AiOutlineDelete } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { CartActions } from "../../redux/reduser.Cart";

const Cart_card = ({ data }) => {
  const [count, setCount] = useState(data.count);
  const dispatch = useDispatch();
  return (
    <div className="cart_item">
      <Link to={"/car/" + data.car_id} className="cart_img_wrapper">
        <img src={data.baseimgurl} alt="" />
      </Link>
      <p>{data.title}</p>
      <p>{data.price}</p>
      <div className="cart_count_wrapper">
        <div className="cart_count_btn_group">
          <button
            onClick={() => {
              fetch(
                process.env.REACT_APP_BASE_URL + "/cart/update/" + data.id,
                {
                  method: "PUT",
                  body: JSON.stringify({
                    count: count + 1,
                  }),
                  headers: {
                    authorization: localStorage.getItem("token"),
                    "Content-Type": "application/json",
                  },
                }
              )
                .then((res) => res.json())
                .then((data) => {
                  if (data.error) {
                    alert(data.message);
                  }
                  dispatch(CartActions.setPosts(data));
                  setCount((prev) => (prev += 1));
                });
            }}
          >
            +
          </button>
          <button
            onClick={() => {
              fetch(
                process.env.REACT_APP_BASE_URL + "/cart/update/" + data.id,
                {
                  method: "PUT",
                  body: JSON.stringify({
                    count: count > 1 ? count - 1 : 1,
                  }),
                  headers: {
                    authorization: localStorage.getItem("token"),
                    "Content-Type": "application/json",
                  },
                }
              )
                .then((res) => res.json())
                .then((data) => {
                  if (data.error) {
                    alert(data.message);
                  }
                  dispatch(CartActions.setPosts(data));
                  setCount((prev) => (prev > 1 ? (prev -= 1) : 1));
                });
            }}
          >
            -
          </button>
        </div>
        <span>{count}</span>
        <button
          className="deleteBtn"
          onClick={() => {
            fetch(process.env.REACT_APP_BASE_URL + "/cart/delete/" + data.id, {
              method: "DELETE",
              headers: {
                authorization: localStorage.getItem("token"),
              },
            })
              .then((res) => res.json())
              .then((data) => {
                if (data.error) {
                  return;
                }
                dispatch(CartActions.setPosts(data));
              });
          }}
        >
          <AiOutlineDelete />
        </button>
      </div>
    </div>
  );
};
export default Cart_card;
