import React, { useEffect } from 'react';
import { UPDATE_CATEGORIES, UPDATE_CURRENT_CATEGORY } from '../../utils/actions';

import { useQuery } from '@apollo/react-hooks';
import { QUERY_CATEGORIES } from "../../utils/queries";
// The first thing we'll do is import our custom useStoreContext() Hook by adding the following code towards the top of the file:
import { useStoreContext } from "../../utils/GlobalState";
import { idbPromise } from '../../utils/helpers';

function CategoryMenu() {
  // const { data: categoryData } = useQuery(QUERY_CATEGORIES);
  // const categories = categoryData?.categories || [];

  const [state, dispatch] = useStoreContext();
  const { categories } = state;
  // Next, update the useQuery() Hook to destructure a loading variable, as the following code shows:
  const { loading, data: categoryData } = useQuery(QUERY_CATEGORIES);

  /* We need to somehow take the categoryData that returns from the useQuery() Hook 
  and use the dispatch() method to set our global state. 
  Now when this component loads and the response from the useQuery() Hook returns, 
  the useEffect() Hook notices that categoryData is not undefined anymore and runs the dispatch() function, 
  setting our category data to the global state!*/

  /* But the beauty of the useEffect() Hook is that it not only runs on component load, 
  but also when some form of state changes in that component. So when useQuery() finishes, and we have data in categoryData, 
  the useEffect() Hook runs again and notices that categoryData exists! 
  Because of that, it does its job and executes the dispatch() function.*/ 
  useEffect(() => {
    // if categoryData exists or has changed from the response of useQuery, then run dispatch()
    if (categoryData) {
      // execute our dispatch function with our action object indicating the type of action and the data to set our state for categories to
      dispatch({
        type: UPDATE_CATEGORIES,
        categories: categoryData.categories
      });
      // update the useEffect() Hook to also write category data to the categories object store in IndexedDB when we save categories to state. 
      categoryData.categories.forEach(category => {
        idbPromise('categories', 'put', category);
      });
    } else if (!loading) {
      idbPromise('categories', 'get').then(categories => {
        dispatch({
          type: UPDATE_CATEGORIES,
          categories: categories
        });
      });
    }
  }, [categoryData, loading, dispatch]);

  const handleClick = id => {
    dispatch({
      type: UPDATE_CURRENT_CATEGORY,
      currentCategory: id
    });
  };

  return (
    <div>
      <h2>Choose a Category:</h2>
      {categories.map(item => (
        <button
          key={item._id}
          onClick={() => {
            handleClick(item._id);
          }}
        >
          {item.name}
        </button>
      ))}
    </div>
  );
}

export default CategoryMenu;
