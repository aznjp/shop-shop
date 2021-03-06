import React from 'react';

import { REMOVE_FROM_CART, UPDATE_CART_QUANTITY } from '../../utils/actions';
import { idbPromise } from "../../utils/helpers";
import {useDispatch} from "react-redux";

const CartItem = ({ item }) => {
  //   Note that we only destructured the dispatch() function from the useStoreContext Hook, 
  //   because the CartItem component has no need to read state. 
  const dispatch = useDispatch();

  const removeFromCart = item => {
    dispatch({
      type: REMOVE_FROM_CART,
      _id: item._id
    });
    idbPromise('cart', 'delete', { ...item });
  };

  // Once the quantity of items found in cart is equivalent to 0 then it is removed from the cart
  // Otherwise it will allow you to change the quantity once it is added to the cart  
  const onChange = (e) => {
    const value = e.target.value;
  
    if (value === '0') {
      dispatch({
        type: REMOVE_FROM_CART,
        _id: item._id
      });

      idbPromise('cart', 'delete', { ...item });
    } else {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: item._id,
        purchaseQuantity: parseInt(value)
      });

      idbPromise('cart', 'put', { ...item, purchaseQuantity: parseInt(value) });
    }
  };

  return (
    <div className="flex-row">
      <div>
        <img
          src={`/images/${item.image}`}
          alt=""
        />
      </div>
      <div>
        <div>{item.name}, ${item.price}</div>
        <div>
          <span>Qty:</span>
          <input
            type="number"
            placeholder="1"
            value={item.purchaseQuantity}
            onChange={onChange}
          />
        <span
          role="img"
          aria-label="trash"
          onClick={() => removeFromCart(item)}
        >
          🗑️
        </span>
        </div>
      </div>
    </div>
  );
}

export default CartItem;