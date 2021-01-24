import React, { useEffect } from "react";
import { loadStripe } from '@stripe/stripe-js';
import { useLazyQuery } from '@apollo/react-hooks';

import CartItem from '../CartItem';
// Auth was imported to conditionally render checkout 
import Auth from '../../utils/auth';
import { QUERY_CHECKOUT } from '../../utils/queries';
import { TOGGLE_CART, ADD_MULTIPLE_TO_CART } from "../../utils/actions";
import { idbPromise } from "../../utils/helpers";
import {useDispatch, useSelector} from "react-redux";

import './style.css';

const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

const Cart = () => {

  // Changed state and dispatch utilized from previous react-context
  const state = useSelector((state)=> {
    return state
  })
  const dispatch = useDispatch();
  
  const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);

  /* With this function in place, we're checking to see if state.cart.length is 0, 
  then executing getCart() to retrieve the items from the cart object store and save it to the global state object. 
  We dispatch the ADD_MULTIPLE_TO_CART action here because we have an array of items returning from IndexedDB, even if it's just one product saved. 
  This way we can just dump all of the products into the global state object at once instead of doing it one by one.*/ 
  useEffect(() => {
    async function getCart() {
      const cart = await idbPromise('cart', 'get');
      dispatch({ type: ADD_MULTIPLE_TO_CART, products: [...cart] });
    };
  
    if (!state.cart.length) {
      getCart();
    }
  }, [state.cart.length, dispatch]);

  // This will then watch for changes to the data via the get checkout function in submit checkout and will then redirect to payout via stripe
  useEffect(() => {
    if (data) {
      stripePromise.then((res) => {
        res.redirectToCheckout({ sessionId: data.checkout.session });
      });
    }
  }, [data]);

  function toggleCart() {
    dispatch({ type: TOGGLE_CART });
  }

  function calculateTotal() {
    let sum = 0;
    state.cart.forEach(item => {
      sum += item.price * item.purchaseQuantity;
    });
    return sum.toFixed(2);
  }

  function submitCheckout() {
    const productIds = [];
  
    getCheckout({
      variables: { products: productIds }
    });

    state.cart.forEach((item) => {
      for (let i = 0; i < item.purchaseQuantity; i++) {
        productIds.push(item._id);
      }
    });
    // the data variable at the hook at the top of Cart functional component
    // will contain the checkout session after the query is called using this getCheckout function here
  }

  // This will keep the tab closed if the cartOpen state is false and thus show the jsx down below instead
  if (!state.cartOpen) {
    return (
      <div className="cart-closed" onClick={toggleCart}>
        <span
          role="img"
          aria-label="trash">🛒</span>
      </div>
    );
  }

  return (
    <div className="cart">
    {/* The state is initially in close until changed via interaction */}
    <div className="close" onClick={toggleCart}>[close]</div>
      <h2>Shopping Cart</h2>
      {state.cart.length ? (
        <div>
          {state.cart.map(item => (
            <CartItem key={item._id} item={item} />
          ))}
          <div className="flex-row space-between">
            {/* The strong div will now calculate the total using the function above */}
            <strong>Total: ${calculateTotal()}</strong>
            {
              Auth.loggedIn() ?
                <button onClick={submitCheckout}>
                  Checkout
                </button>
                :
                <span>(log in to check out)</span>
            }
          </div>
        </div>
    // This is used to seperate between the two htmls based on whether there are items in the cart or not
        ) : (
            <h3>
              <span role="img" aria-label="shocked">
                😱
              </span>
              You haven't added anything to your cart yet!
            </h3>
          )}
    </div>
  );
};

export default Cart;