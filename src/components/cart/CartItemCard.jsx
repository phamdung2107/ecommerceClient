import { Link } from "react-router-dom";
import "./CartItemCard.css";

const CartItemCard = ({ item, deleteCartItems }) => {
  return (
    <div className="CartItemCard">
      <img src={item.productImage} alt="ssa" />
      <div>
        <Link to={`/product/${item.productId}`}>{item.productName}</Link>
        <span>{`Price: $ ${item.productPrice}`}</span>
        <p onClick={() => deleteCartItems(item.product)}>Remove</p>
      </div>
    </div>
  );
};

export default CartItemCard;
