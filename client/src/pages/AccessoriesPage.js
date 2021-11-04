import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchOneAccessories } from "../http/productsAPI";
import ProductPage from "./ProductPage";
const AccessoriesPage = () => {
  const [product, setProduct] = useState({});
  const { id } = useParams();
  useEffect(() => {
    fetchOneAccessories(id).then((data) => setProduct(data));
  }, []);
  return <ProductPage product={product} />;
};
export default AccessoriesPage;
