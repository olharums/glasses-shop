import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchOneGlasses } from "../http/productsAPI";
import ProductPage from "./ProductPage";
const GlassesPage = () => {
  const [product, setProduct] = useState({});
  const { id } = useParams();
  useEffect(() => {
    fetchOneGlasses(id).then((data) => setProduct(data));
  }, []);
  return <ProductPage product={product} />;
};
export default GlassesPage;
