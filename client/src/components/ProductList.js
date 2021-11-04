import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { Row } from "react-bootstrap";
import ProductItem from "./ProductItem";
import { Context } from "../index";
const ProductList = observer(() => {
  const { product } = useContext(Context);
  return (
    <Row className="d-flex mt-3">
      {product.displayedProducts.map((elem) => {
        return <ProductItem key={elem.name} item={elem} />;
      })}
    </Row>
  );
});
export default ProductList;
