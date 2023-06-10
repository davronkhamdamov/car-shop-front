import ReactPaginate from "react-paginate";
import React, { useEffect, useState } from "react";
import "./Users.css";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { UserActions } from "../../redux/reduser.Users";

const Users = () => {
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const items = useSelector((data) => data.users.users);
  const item = useSelector((data) => data.user.data);
  const dispatch = useDispatch();

  useEffect(() => {
    if (items[0]) {
      const endOffset = itemOffset + 10;
      setCurrentItems(items?.slice(itemOffset, endOffset));
      setPageCount(Math.ceil(items.length / 10));
    }
  }, [items, itemOffset]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * 10) % items.length;
    setItemOffset(newOffset);
  };
  return (
    <div>
      <div className="dashborad_head">
        <h2>Users</h2>
      </div>
      <div className="dashboard_list_wrapper">
        <div className="usersTags">
          <div>#</div>
          <div>Username</div>
          <div>email</div>
          <div>role</div>
          <div>User img</div>
        </div>
        <div className="users_dashboard_list">
          {currentItems
            ?.filter((e) => e.id !== item.id)
            .map((e, i) => {
              return (
                <div key={e.id} className="user_dashboard_list-item">
                  <div>{i + 1}</div>
                  <div>{e.username}</div>
                  <div>{e.email}</div>
                  <div className="user_edit_wrapper">
                    {e.role ? (
                      <div className="role_wrapper">
                        Admin
                        <button
                          className="editbtn"
                          onClick={() => {
                            fetch(
                              process.env.REACT_APP_BASE_URL +
                                "/users/updaterole/" +
                                e.id,
                              {
                                method: "PUT",
                                body: JSON.stringify({
                                  role: false,
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
                                dispatch(UserActions.setPosts(data));
                              });
                          }}
                        >
                          <AiOutlineClose />
                        </button>
                      </div>
                    ) : (
                      <div className="role_wrapper">
                        User
                        <button
                          className="editbtn"
                          onClick={() => {
                            fetch(
                              process.env.REACT_APP_BASE_URL +
                                "/users/updaterole/" +
                                e.id,
                              {
                                method: "PUT",
                                body: JSON.stringify({
                                  role: true,
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
                                dispatch(UserActions.setPosts(data));
                              });
                          }}
                        >
                          <AiOutlineCheck />
                        </button>
                      </div>
                    )}
                  </div>
                  <div className="users_img">
                    <img src={e.imgurl} alt="" />
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
    </div>
  );
};

export default Users;
