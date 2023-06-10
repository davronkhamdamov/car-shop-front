import "./Card.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { Link } from "react-router-dom";

const Card = ({ data, type }) => {
  return data?.map((e, i) => {
    return (
      <Link
        to={type === "car" ? "/car/" + e.id : "/model/" + e.id}
        key={i}
        className="category_item"
      >
        <div className="imgWrapper">
          <LazyLoadImage effect="blur" src={e?.baseimgurl || e?.modelimgurl} />
        </div>
        <br />
        <p className="category_title">{e.title}</p>
      </Link>
    );
  });
};

export default Card;
