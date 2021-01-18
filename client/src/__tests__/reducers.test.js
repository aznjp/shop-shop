// import our actions
import {
  UPDATE_PRODUCTS,
  UPDATE_CATEGORIES,
  UPDATE_CURRENT_CATEGORY
} from '../utils/actions';

// import our reducer() function to reducers.test.js
import { reducer } from '../utils/reducers';

// create a sample of what our global state will look like
// So the product state will be empty so that it can be filled with whatever products relates to the category currently in place (i.e Food)
// It will relate this to the current category
const initialState = {
  products: [],
  categories: [{ name: 'Food' }],
  currentCategory: '1',
};

// +++++++++++++++++++++++++++++++ PRODUCT TEST +++++++++++++++++++++++++++++++++++++++++++++++  
test('UPDATE_PRODUCTS', () => {
  let newState = reducer(initialState, {
    type: UPDATE_PRODUCTS,
    products: [{}, {}]
  });

  expect(newState.products.length).toBe(2);
  expect(initialState.products.length).toBe(0);
});

// +++++++++++++++++++++++++++++++ CATEGORY TEST +++++++++++++++++++++++++++++++++++++++++++++++  
test('UPDATE_CATEGORIES', () => {
  let newState = reducer(initialState, {
    type: UPDATE_CATEGORIES,
    categories: [{}, {}]
  });

  expect(newState.categories.length).toBe(2);
  expect(initialState.categories.length).toBe(1);
});

test('UPDATE_CURRENT_CATEGORY', () => {
  let newState = reducer(initialState, {
    type: UPDATE_CURRENT_CATEGORY,
    currentCategory: '2'
  });

  expect(newState.currentCategory).toBe('2');
  expect(initialState.currentCategory).toBe('1');
});

// // original state
// const state = {
//     name: 'Lernantino',
//     email: 'lernantino@gmail.com' 
// };

// // create a new version of state by making a copy of the original state's data and updating only the part that has changed
// const updatedState = {...state, email: 'lernantino99@gmail.com'};

/* A reducer is a function that updates state by returning a new state object and never alters the original state object. 
Now, that doesn't mean the data inside the state object isn't altered. Of course, it is—why else would we need to update state? 
The key takeaway here is that state is intended to be (IMMUTABLE), meaning it never should be directly altered in any way. */ 