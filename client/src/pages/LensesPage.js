import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchOneLenses } from "../http/productsAPI";
import ProductPage from "./ProductPage";
const LensesPage = () => {
  const [product, setProduct] = useState({});
  const { id } = useParams();
  useEffect(() => {
    fetchOneLenses(id).then((data) => setProduct(data));
  }, []);
  return <ProductPage product={product} />;
};
export default LensesPage;
