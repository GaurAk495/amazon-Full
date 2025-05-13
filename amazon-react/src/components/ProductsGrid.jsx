import ProductContainer from "./ProductContainer";
import { useSelector } from "react-redux";
import Loader from "./Loader";
import { useLocation } from "react-router-dom";

function ProductsGrid() {
  const fetchedProducts = useSelector(
    (store) => store.fetching.fetchedProducts
  );
  let products = useSelector((store) => store.products);
  const location = useLocation();
  const searchParam = new URLSearchParams(location.search);
  const searchedProduct = searchParam.get("searchProduct");

  if (searchedProduct) {
    products = products.filter((product) => {
      return (
        product.name.toLowerCase().includes(searchedProduct) ||
        product.keywords.includes(searchedProduct)
      );
    });
  }

  return (
    <div className="main">
      {!fetchedProducts && <Loader />}
      <div className="products-grid">
        {fetchedProducts &&
          products.map((product) => {
            return <ProductContainer key={product._id} product={product} />;
          })}
      </div>
    </div>
  );
}

export default ProductsGrid;
