import React, { useEffect, useState } from "react";
import "./Admin.css";
import { HiHome } from "react-icons/hi";
import { BsShop } from "react-icons/bs";
import { BiEdit, BiPlus } from "react-icons/bi";
import ReactPaginate from "react-paginate";

function Admin() {
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  const items = [...Array(40).keys()];
  items.shift();

  useEffect(() => {
    const endOffset = itemOffset + 10;
    setCurrentItems(items.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(items.length / 10));
  }, [itemOffset]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * 10) % items.length;
    setItemOffset(newOffset);
  };
  return (
    <div className="admin_wraper">
      <div className="navigator">
        <div className="navigator-item">
          <HiHome />
          Asosiy
        </div>
        <div className="navigator-item">
          <BsShop />
          E'lonlar
        </div>
        <div className="navigator-item">
          <BiEdit />
          Savollar
        </div>
      </div>
      <div className="dashborad">
        <div className="dashborad_head">
          <h2>Mashinalar</h2>
          <div className="dashborad_head-btns">
            <button>
              <BiPlus />
              Kategoriya qo’shish
            </button>
            <button>
              <BiPlus />
              Mashina qo‘shish
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
                <div key={i} className="dashboard_list-item">
                  <div>{e}</div>
                  <div>Malibu</div>
                  <div>Avtomat karobka</div>
                  <div>Yoq</div>
                  <div>1.6</div>
                  <div>2016</div>
                  <div>Oq</div>
                  <div>3000km</div>
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
    </div>
  );
}

export default Admin;
