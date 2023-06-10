import ReactPaginate from "react-paginate";
import React, { useEffect, useState } from "react";
import "./Cars.css";
import { BiPlus } from "react-icons/bi";
import { FiEdit2 } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { CarActions } from "../../redux/reduser.Cars";
import { fileUpload } from "../../utils/imgUpload";
import { AiOutlineDelete } from "react-icons/ai";

const Cars = () => {
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [modal, setModal] = useState(false);
  const [carId, setCarId] = useState("");
  const [loading, setLoading] = useState(false);
  const items = useSelector((data) => data.car.cars);
  const models = useSelector((data) => data.model.models);
  const dispatch = useDispatch();

  useEffect(() => {
    if (items[0]) {
      const endOffset = itemOffset + 10;
      setCurrentItems(items?.slice(itemOffset, endOffset));
      setPageCount(Math.ceil(items?.length / 10));
    }
  }, [items, carId, itemOffset]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * 10) % items.length;
    setItemOffset(newOffset);
  };
  const Modal = ({ id }) => {
    return (
      <form
        className="cars_modal"
        onSubmit={async (e) => {
          setLoading(true);
          e.preventDefault();
          let files = e.target.baseimg.files;
          let files2 = e.target.insideimg.files;
          let files3 = e.target.outsideimg.files;

          const formData = new FormData();
          const formData2 = new FormData();
          const formData3 = new FormData();

          formData.append("file", files[0]);
          formData2.append("file", files2[0]);
          formData3.append("file", files3[0]);

          formData.append("upload_preset", "youtube");
          formData2.append("upload_preset", "youtube");
          formData3.append("upload_preset", "youtube");

          const image = await fileUpload(formData);
          const image2 = await fileUpload(formData2);
          const image3 = await fileUpload(formData3);
          let fetchType = "/car/create";
          if (id !== "") {
            fetchType = "/car/update/" + id;
          }
          fetch(process.env.REACT_APP_BASE_URL + fetchType, {
            method: id === "" ? "POST" : "PUT",
            body: JSON.stringify({
              title: e.target.title.value,
              price: e.target.price.value,
              motor: e.target.motor.value,
              color: e.target.color.value,
              gearbook: "Avtomat karobka",
              deseription: e.target.deseription.value,
              tanirovkasi: e.target.tanirofka.value === "ha" ? true : false,
              year: e.target.year.value,
              distance: e.target.distance.value,
              baseimgurl: image,
              insideimgurl: image2,
              outsideimgurl: image3,
              modelid: e.target.model.value,
            }),
            headers: {
              authorization: localStorage.getItem("token"),
              "content-type": "application/json",
            },
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.error) {
                alert(data.message);
              } else {
                dispatch(CarActions.setPosts(data));
                setLoading(false);
                setModal(false);
                setCarId("");
              }
            });
        }}
      >
        <div className="car_modal_wrapper">
          <select type="text" required name="model">
            {models?.map((e) => {
              return (
                <option key={e.id} value={e.id}>
                  {e.title}
                </option>
              );
            })}
          </select>
          <select name="tanirofka" type="text" required>
            <option disabled>Tanirovkasi</option>
            <option value="ha">Ha</option>
            <option value="yoq">Yoq</option>
          </select>
          <input type="text" name="title" required placeholder="Enter name" />
          <input type="text" name="motor" required placeholder="Enter Motor" />
          <input
            type="number"
            max={String(new Date().getFullYear)}
            min="2000"
            required
            name="year"
            placeholder="Enter Year"
          />
          <input type="text" name="color" required placeholder="Enter Color" />
          <input
            name="distance"
            type="text"
            required
            placeholder="Enter Distance"
          />
          <input
            type="number"
            name="price"
            required
            placeholder="Enter price"
          />
          <div className="image_input">
            <span>Base image</span>
            <input
              type="file"
              name="baseimg"
              required
              accept="image/png, image/jpeg,image/webp"
            />
          </div>
          <div className="outside_image">
            <span>Outside image</span>
            <input
              type="file"
              name="outsideimg"
              accept="image/png, image/jpeg"
              required
            />
          </div>
          <div className="last_items">
            <textarea name="deseription" placeholder="Deseription" required />
            <div className="inside_input">
              <span>Inside image</span>
              <input
                name="insideimg"
                type="file"
                required
                accept="image/png, image/jpeg"
              />
            </div>
          </div>
        </div>
        <div className="car_modal_btn">
          <button>{loading ? "loading..." : "Submit"}</button>
          <button
            onClick={() => {
              setCarId("");
              setModal(false);
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    );
  };
  return (
    <div>
      <div className="dashborad_head">
        <h2>Cars</h2>
        <div className="dashborad_head-btns">
          <button
            onClick={() => {
              setCarId("");
              setModal(true);
            }}
          >
            <BiPlus />
            Add car
          </button>
        </div>
      </div>
      <div className="dashboard_list_wrapper">
        <div className="tags">
          <div>#</div>
          <div>Brend</div>
          <div>Gearbook</div>
          <div>Tanirovkasi</div>
          <div>Motor</div>
          <div>Year</div>
          <div>Color</div>
          <div>Distance</div>
        </div>
        <div className="dashboard_list">
          {currentItems?.map((e, i) => {
            return (
              <div key={e.id} className="dashboard_list-item">
                <div>{i + 1}</div>
                <div>{e.title}</div>
                <div>{e.gearbook}</div>
                <div>{e.tanirovkasi ? "Ha" : "Yoq"}</div>
                <div>{e.motor}</div>
                <div>{e.year}</div>
                <div>{e.color}</div>
                <div>{e.distance}</div>
                <div>
                  <button
                    className="editbtn"
                    onClick={() => {
                      setCarId(e.id);
                      setModal(true);
                    }}
                  >
                    <FiEdit2 />
                  </button>
                  <button
                    className="editbtn"
                    onClick={() => {
                      fetch(
                        process.env.REACT_APP_BASE_URL + "/car/delete/" + e.id,
                        {
                          method: "DELETE",
                          headers: {
                            authorization: localStorage.getItem("token"),
                            "content-type": "application/json",
                          },
                        }
                      )
                        .then((res) => res.json())
                        .then((data) => {
                          dispatch(CarActions.setPosts(data));
                        });
                    }}
                  >
                    <AiOutlineDelete />
                  </button>
                </div>
              </div>
            );
          })}
          <div className="pagination_wrapper">
            <ReactPaginate
              nextLabel="next >"
              onPageChange={handlePageClick}
              pageRangeDisplayed={3}
              marginPagesDisplayed={2}
              pageCount={pageCount}
              previousLabel="< previous"
              pageClassName="page-item"
              pageLinkClassName="page-link"
              previousClassName="page-item"
              previousLinkClassName="page-link"
              nextClassName="page-item"
              nextLinkClassName="page-link"
              breakLabel="..."
              breakClassName="page-item"
              breakLinkClassName="page-link"
              containerClassName="pagination"
              activeClassName="active"
              renderOnZeroPageCount={null}
            />
          </div>
        </div>
      </div>
      <div
        className={modal ? "visibleCar active" : "visibleCar"}
        onClick={() => {
          setCarId("");
          setModal(!modal);
        }}
      />
      {modal && <Modal id={carId} />}
    </div>
  );
};

export default Cars;
