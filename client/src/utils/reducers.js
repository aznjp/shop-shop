import {
  UPDATE_PRODUCTS,
  UPDATE_CATEGORIES,
  UPDATE_CURRENT_CATEGORY
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