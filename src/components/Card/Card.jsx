import "./Card.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { Link } from "react-router-dom";

const Card = ({ data }) => {
  return data?.map((e) => {
    return (
      <Link to={e.id} key={e.id} className="category_item">
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
