import {
  UPDATE_PRODUCTS,
  UPDATE_CATEGORIES,
  UPDATE_CURRENT_CATEGORY,
  ADD_TO_CART,
  ADD_MULTIPLE_TO_CART,
  REMOVE_FROM_CART,
  UPDATE_CART_QUANTITY,
  CLEAR_CART,
  TOGGLE_CART
} from "./actions";

import { useReducer } from 'react';

export const reducer = (state, action) => {
  switch (action.type) {
    // if action type value is the value of `UPDATE_PRODUCTS`, return a new state object with an updated products array
    case UPDATE_PRODUCTS:
      return {
        ...state,
        products: [...action.products]
      };
    // if action type value is the value of `UPDATE_CATEGORIES`, return a new state object with an updated categories array
    case UPDATE_CATEGORIES:
      return {
        ...state,
        categories: [...action.categories]
      };
    // With this test, we are updating the state of currentCategory to a new string value instead of an array. 
    // When the test runs, compare these values between newState and initialState to confirm that initialState has remained the same.
    case UPDATE_CURRENT_CATEGORY:
      return {
        ...state,
        currentCategory: action.currentCategory
      };
    
    case ADD_TO_CART:
      return {
        ...state,
        cartOpen: true,
        cart: [...state.cart, action.product]
      };
    // NOTE: It says products not product for the cart to add multiple products (Will test to check new amount in test)
    case ADD_MULTIPLE_TO_CART:
      return {
        ...state,
        cart: [...state.cart, ...action.products],
      };
    
    // NOTE: The use of the filter() method that only keeps the items that don't match the provided _id property. 
    // In the return statement, we also check the length of the array to set cartOpen to false when the array is empty. 
    // Run the test to verify that all of the conditions pass.
    case REMOVE_FROM_CART:
      let newState = state.cart.filter(product => {
        return product._id !== action._id;
      });
    
      return {
        ...state,
        cartOpen: newState.length > 0,
        cart: newState
      };

    // NOTE: The use of the map() method is used to one treat the original state as immutable and so that the act of purchasing larger quanitities is only tied to the direct action
    case UPDATE_CART_QUANTITY:
      return {
        ...state,
        cartOpen: true,
        cart: state.cart.map(product => {
          if (action._id === product._id) {
            product.purchaseQuantity = action.purchaseQuantity;
          }
          return product;
        })
      };
    
    // NOTE: Once the action is put into motion the state will update to put the cartOpen into a false state and empty the cart array out
    case CLEAR_CART:
      return {
        ...state,
        cartOpen: false,
        cart: []
      };
    
    case TOGGLE_CART:
      return {
        ...state,
        cartOpen: !state.cartOpen
      };

    default:
      return state;
  }
};

/* This function, useProductReducer(), will be used to help initialize our global state object 
and then provide us with the functionality for updating that state by automatically running it through our custom reducer() function. 
Think of this as a more in-depth way of using the useState() Hook we've used so much.*/ 
export function useProductReducer(initialState) {
  return useReducer(reducer, initialState);
}