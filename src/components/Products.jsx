import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import { useProducts } from "../context/ProductContext";
import Product from "./Product";
import SkeletonLoader from "./SkeletonLoader";

const Products = () => {
  const { products, setCategory, categories } = useProducts();
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");

  useEffect(() => {
    setCategory(category);
  }, [setCategory, category]);

  const productsTitle = categories[category] || "Товары";

  return (
    <section className="products">
      <div className="container">
        <h2 className="products__title">{productsTitle}</h2>

        <ul className="products__list">
          {products.length ? (
            products.map((item) => <Product key={item.id} data={item} />)
          ) : (
            <SkeletonLoader />
          )}
        </ul>
      </div>
    </section>
  );
};

export default Products;
