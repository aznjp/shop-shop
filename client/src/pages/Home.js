import React from "react";
import ProductList from "../components/ProductList";
import CategoryMenu from "../components/CategoryMenu";

const Home = () => {
// As state is now being managed in the global scope we no longer need to define it within the home page component
  return (
    <div className="container">
      <CategoryMenu />
      <ProductList />
    </div>
  );
};

export default Home;
