import React from "react";
import { Row, Col, Container, Image, Button } from "react-bootstrap";
// import require from 'axios'
const ProductPage = ({ product }) => {
  return (
    <Container className="mt-3 text-center">
      <Row className="align-items-center">
        <Col md={6} className="mb-3">
          <Image
            width={500}
            height={500}
            src={process.env.REACT_APP_API_URL + product.img}
          />
        </Col>
        <Col
          style={{ height: 380 }}
          md={6}
          className="d-flex flex-column justify-content-around align-items-center mb-3 p-3"
        >
          <h2>{product.name}</h2>
          <h3>{product.price}$</h3>
          <Button variant="outline-success">Добавить в корзину</Button>
        </Col>
      </Row>
      <Row className="p-5">
        <h1>Характеристики</h1>
        <Row>
          <h3>...</h3>
        </Row>
        <Row>
          <h3>...</h3>
        </Row>
        <Row>
          <h3>...</h3>
        </Row>
        <Row>
          <h3>...</h3>
        </Row>
      </Row>
    </Container>
  );
};
export default ProductPage;
