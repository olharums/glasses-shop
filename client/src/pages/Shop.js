import { observer } from "mobx-react-lite";
import React, { useContext, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Context } from "..";
import FilterBar from "../components/FilterBar";
import ProductList from "../components/ProductList";
import {
  fetchAccessories,
  fetchGlasses,
  fetchLenses,
} from "../http/productsAPI";

const Shop = observer(() => {
  const { product } = useContext(Context);

  useEffect(() => {
    fetchAccessories().then((data) => product.setAccessories(data.rows));
    fetchGlasses().then((data) => product.setGlasses(data.rows));
    fetchLenses().then((data) => product.setLenses(data.rows));
  },[]);
  return (
    <Container>
      <Row className="mt-2">
        <Col md={3}>
          <FilterBar />
        </Col>
        <Col md={9}>
          <ProductList />
        </Col>
      </Row>
    </Container>
  );
});
export default Shop;
