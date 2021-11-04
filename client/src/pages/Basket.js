// import { observe } from "mobx";
import { observer } from "mobx-react-lite";
import React, { useContext, useEffect } from "react";
import { Button, Card, Col, Container, Row, Table } from "react-bootstrap";
import { Context } from "..";

const Basket = observer(() => {
  const { basket } = useContext(Context);

  const deleteItem = (item) => {
    basket.removeItem(item);
    localStorage.setItem("basket", JSON.stringify(basket.list));
  };
  const increaseQuantity = (item) => {
    basket.addItem(item);
    localStorage.setItem("basket", JSON.stringify(basket.list));
  };
  const decreaseQuantity = (item) => {
    basket.minimizeQuantity(item);
    localStorage.setItem("basket", JSON.stringify(basket.list));
  };

  useEffect(() => {
    basket.setList(JSON.parse(localStorage.getItem("basket")));
  });
  return (
    <Container>
      <h2 className="text-center">Корзина</h2>
      {basket.list ? (
        <Row className="mt-2">
          <Col md={9}>
            {console.log(basket.list)}
            {basket.list.map((arr) => {
              console.log(arr[0].name);
              return (
                <Card className="p-5 m-3" key={arr[0].type + arr[0].id}>
                  <Row>
                    <Col md={3}>
                      <img
                        width={"200"}
                        height={"150"}
                        src={process.env.REACT_APP_API_URL + arr[0].img}
                      />
                    </Col>
                    <Col>
                      <h3>{arr[0].name}</h3>
                      <h6>
                        <span style={{ color: "#a2a2a2" }}>
                          {arr[0].purpose
                            ? "Предназначение: "
                            : "Производство: "}
                        </span>
                        {arr[0].purpose || arr[0].manufacturer}
                      </h6>
                      <h6>
                        <span style={{ color: "#a2a2a2" }}>{"Цена: "}</span>
                        {arr[0].price}$
                      </h6>
                      <h6>
                        <span style={{ color: "#a2a2a2" }}>
                          {"Категория: "}
                        </span>
                        {arr[0].type === "accessories"
                          ? "Аксессуары"
                          : arr[0].type === "glasses"
                          ? "Очки"
                          : "Линзы"}
                      </h6>
                    </Col>
                    <Col md={2}>
                      <Button onClick={() => increaseQuantity(arr[0])}>
                        +
                      </Button>
                      <h3>Количество: {arr[1]}</h3>
                      <Button onClick={() => decreaseQuantity(arr[0])}>
                        -
                      </Button>
                    </Col>
                    <Col md={2}>
                      <Button onClick={() => deleteItem(arr[0])}>
                        Удалить
                      </Button>
                    </Col>
                  </Row>
                </Card>
              );
            })}
          </Col>
          <Col md={3}>{/* <ProductList /> */}</Col>
        </Row>
      ) : (
        <h3>Нет товаров</h3>
      )}
    </Container>
  );
});
export default Basket;
