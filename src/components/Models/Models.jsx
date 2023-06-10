import ReactPaginate from "react-paginate";
import React, { useEffect, useState } from "react";
import "./Models.css";
import { BiPlus } from "react-icons/bi";
import { FiEdit2 } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineDelete } from "react-icons/ai";
import { ModelsActions } from "../../redux/reduser.Models";
import { fileUpload } from "../../utils/imgUpload";

const Models = () => {
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [modal, setModal] = useState(false);
  const [modalId, setModalId] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const items = useSelector((data) => data.model.models);
  const dispatch = useDispatch();

  useEffect(() => {
    if (items[0]) {
      const endOffset = itemOffset + 10;
      setCurrentItems(items?.slice(itemOffset, endOffset));
      setPageCount(Math.ceil(items.length / 10));
    }
  }, [items, modal, itemOffset]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * 10) % items.length;
    setItemOffset(newOffset);
  };

  return (
    <div>
      <div className="dashborad_head">
        <h2>Models</h2>
        <div className="dashborad_head-btns">
          <button onClick={() => setModal(!modal)}>
            <BiPlus />
            Add model
          </button>
        </div>
      </div>
      <div className="dashboard_list_wrapper">
        <div className="model_tags">
          <div>#</div>
          <div>Title</div>
          <div>Model image</div>
        </div>
        <div className="dashboard_list">
          {currentItems?.map((e, i) => {
            return (
              <>
                <div key={e.id} className="car_dashboard_list-item">
                  <div>{i + 1}</div>
                  <div>{e.title}</div>
                  <div>{e.gearbook}</div>
                  <div className="users_img">
                    <img src={e.modelimgurl} alt="" />
                  </div>
                  <div
                    className="edit_btn_group"
                    onClick={() => {
                      setModalId(e.id);
                      setUpdateModal(!updateModal);
                    }}
                  >
                    <button className="editbtn">
                      <FiEdit2 />
                    </button>
                    <button
                      className="editbtn"
                      onClick={() => {
                        fetch(
                          process.env.REACT_APP_BASE_URL +
                            "/model/delete/" +
                            e.id,
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
                            dispatch(ModelsActions.setPosts(data));
                          });
                      }}
                    >
                      <AiOutlineDelete />
                    </button>
                  </div>
                </div>
                {updateModal && (
                  <form
                    onSubmit={async (event) => {
                      event.preventDefault();
                      let files = event.target.img.files;
                      const formData = new FormData();
                      formData.append("file", files[0]);
                      formData.append("upload_preset", "youtube");
                      const image = await fileUpload(formData);
                      fetch(
                        process.env.REACT_APP_BASE_URL +
                          "/model/update/" +
                          modalId,
                        {
                          method: "PUT",
                          body: JSON.stringify({
                            title:
                              event.target.title.value === ""
                                ? e.title
                                : event.target.title.value,
                            modelimgurl: image,
                          }),
                          headers: {
                            authorization: localStorage.getItem("token"),
                            "content-type": "application/json",
                          },
                        }
                      )
                        .then((res) => res.json())
                        .then((data) => {
                          if (data.error) {
                            return;
                          }
                          setUpdateModal(false);
                          dispatch(ModelsActions.setPosts(data));
                        });
                    }}
                    className="model_modal"
                  >
                    <p style={{ textAlign: "center" }}>Update model</p>
                    <input
                      type="text"
                      name="title"
                      className="model_title_input"
                      defaultValue={items?.find((e) => e.id === modalId).title}
                    />
                    <br />
                    <br />
                    <input type="file" name="img" />
                    <div className="model_modal_btn_group">
                      <button>Submit</button>
                      <button
                        type="button"
                        onClick={() => setUpdateModal(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                )}
              </>
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
      {modal && (
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            let files = e.target.img.files;
            const formData = new FormData();
            formData.append("file", files[0]);
            formData.append("upload_preset", "youtube");
            const image = await fileUpload(formData);
            fetch(process.env.REACT_APP_BASE_URL + "/model/create", {
              method: "POST",
              body: JSON.stringify({
                title: e.target.title.value,
                modelimgurl: image,
              }),
              headers: {
                authorization: localStorage.getItem("token"),
                "content-type": "application/json",
              },
            })
              .then((res) => res.json())
              .then((data) => {
                setModal(false);
                if (data.error) {
                  return;
                }
                dispatch(ModelsActions.setPosts(data));
              });
          }}
          className="model_modal"
        >
          <p style={{ textAlign: "center" }}>Create model</p>
          <input
            type="text"
            name="title"
            className="model_title_input"
            required
          />
          <br />
          <br />
          <input type="file" name="img" required />
          <div className="model_modal_btn_group">
            <button>Submit</button>
            <button type="button" onClick={() => setModal(false)}>
              Cancel
            </button>
          </div>
        </form>
      )}
      <div
        className={modal || updateModal ? "visibleCar active" : "visibleCar"}
        onClick={() => {
          setModal(false);
          setUpdateModal(false);
        }}
      />
    </div>
  );
};

export default Models;
